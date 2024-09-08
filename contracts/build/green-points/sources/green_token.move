module green_points::green_token{
    use std::signer;
    use std::string::utf8;

    use aptos_framework::coin::{Self, MintCapability, BurnCapability};

    struct GreenToken{}

    struct Caps<phantom CoinType> has key{
        mint: MintCapability<CoinType>,
        burn: BurnCapability<CoinType>,
    }

    public entry fun initialize_coin(token_admin: &signer) {
        let (green_b, green_f, green_m) =
            coin::initialize<GreenToken>(token_admin,
                utf8(b"Green Token"), utf8(b"GREEN"), 9, true);
        coin::destroy_freeze_cap(green_f);
        move_to(token_admin, Caps<GreenToken> { mint: green_m, burn: green_b });
    }

    public entry fun mint_coin<CoinType>(token_admin: &signer, acc_addr: address, amount: u64) acquires Caps {
        let token_admin_addr  = signer::address_of(token_admin);
        let caps = borrow_global<Caps<CoinType>>(token_admin_addr);
        let coins = coin::mint<CoinType>(amount, &caps.mint);
        coin::deposit(acc_addr, coins);
    }

    public entry fun initialize_user(caller:&signer){
        coin::register<GreenToken>(caller);
    }

    #[view]
    public fun is_initialized(user: address):bool{
        coin::is_account_registered<GreenToken>(user)
    }
}