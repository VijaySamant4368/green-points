module green_points::accounts{
    use green_points::green_token::{Self, GreenToken};
    use aptos_framework::coin::{Self, Coin};
    use aptos_std::table::{Self, Table};
    use aptos_std::aptos_hash::keccak256;
    use std::string::{Self, String};
    use std::signer;
    
    const EWRONG_CODE :u64 = 1;
    const ENOT_INITIALIZED :u64 = 1;

    struct AccountTable has key{
        table: Table<u64, Account>,
    }
    
    struct Account has key, store{
        hash: vector<u8>,
        balance: Coin<GreenToken>,
    }

    public entry fun initialize_table(caller: &signer){
        move_to(caller, AccountTable{
            table: table::new()
        })
    }

    public entry fun initialize_account(
        caller: &signer, 
        account_address:address, 
        id:u64, 
        code: String, 
        amount:u64
    ) acquires AccountTable{
        // Convert Unique Code to Hash
        let converted_string = string::bytes(&code);
        let hash = keccak256(*converted_string);
        // Find the Table of QR Accounts
        let account_table = borrow_global_mut<AccountTable>(account_address); 
        // Add a new account to the table
        let new_account = Account{
            hash,
            balance: coin::withdraw<GreenToken>(caller, amount),
        };
        table::add(&mut account_table.table, id, new_account);
    }

    public entry fun claim_points(
        caller: &signer, 
        account_address:address, 
        id:u64, 
        code:String
    )acquires AccountTable{
        // Convert Unique Code to Hash
        let converted_string = string::bytes(&code);
        let hash = keccak256(*converted_string);
        // Find the Table of QR Accounts
        let account_table = borrow_global_mut<AccountTable>(account_address);
        let qr_account = table::borrow_mut(&mut account_table.table, id);
        // Make sure the Unique Code's Hash matches
        assert!(hash == qr_account.hash, EWRONG_CODE);
        // Make sure user has initialized a GreenToken Account
        let caller_address = signer::address_of(caller);
        assert!(green_token::is_initialized(caller_address), ENOT_INITIALIZED);
        
        // Transfer All the Coin balance in the QR Account
        let balance = coin::extract_all<GreenToken>(&mut qr_account.balance);
        coin::deposit<GreenToken>(caller_address, balance);
    }
}