export namespace extern {
    //==============================================
    // Utils
    // @ts-ignore: decorator
    @external("env", "__ping")
    export declare function ping(number: usize): i64;

    // @ts-ignore: decorator
    @external("env", "__constructor")
    export declare function constructor(): i64;

    // @ts-ignore: decorator
    @external("env", "__init")
    export declare function init(): i64;

    // @ts-ignore: decorator
    @external("env", "__inc")
    export declare function inc(): i64;

    // @ts-ignore: decorator
    @external("env", "__write_log")
    export declare function write_log(msg: usize, len: usize): i64;

    //==============================================
    // Http
    // @ts-ignore: decorator
    @external("env", "get_http")
    export declare function get_http(url: usize, urlLen: usize, dataOutputPtr: usize): i64;

    //==============================================
    // Storage
    // @ts-ignore: decorator
    @external("env", "save_sc_result")
    export declare function save_sc_result(path: usize, pathLen: usize, data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_from_storage")
    export declare function get_from_storage(path: usize, pathLen: usize, dataOutputPtr: usize): i64;

    //==============================================
    // Blockchain Transactions
    // @ts-ignore: decorator
    @external("env", "flush")
    export declare function flush(): i64;

    // @ts-ignore: decorator
    @external("env", "mosaic_definition")
    export declare function mosaic_definition(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "address_alias")
    export declare function address_alias(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "mosaic_alias")
    export declare function mosaic_alias(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "add_exchange_offer")
    export declare function add_exchange_offer(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "exchange_offer")
    export declare function exchange_offer(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "transfer")
    export declare function transfer(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "remove_exchange_offer")
    export declare function remove_exchange_offer(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "mosaic_supply_change")
    export declare function mosaic_supply_change(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "register_root_namespace")
    export declare function register_root_namespace(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "register_sub_namespace")
    export declare function register_sub_namespace(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "secret_lock")
    export declare function secret_lock(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "secret_proof")
    export declare function secret_proof(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "transfer_with_namespace")
    export declare function transfer_with_namespace(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "modify_metadata_address")
    export declare function modify_metadata_address(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "modify_metadata_mosaic")
    export declare function modify_metadata_mosaic(data: usize, dataLen: usize): i64;

    // @ts-ignore: decorator
    @external("env", "modify_metadata_namespace")
    export declare function modify_metadata_namespace(data: usize, dataLen: usize): i64;

    //==============================================
    // Blockchain Getters
    // @ts-ignore: decorator
    @external("env", "get_account_exchange_info")
    export declare function get_account_exchange_info(data: usize, dataLen: usize, output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_exchange_offer_by_asset_id")
    export declare function get_exchange_offer_by_asset_id(data: usize, dataLen: usize, output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_mosaic_info")
    export declare function get_mosaic_info(data: usize, dataLen: usize, output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_mosaic_infos")
    export declare function get_mosaic_infos(data: usize, dataLen: usize, output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_mosaics_names")
    export declare function get_mosaics_names(data: usize, dataLen: usize, output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_transaction")
    export declare function get_transaction(data: usize, dataLen: usize, output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_transaction_status")
    export declare function get_transaction_status(data: usize, dataLen: usize, output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_transaction_statuses")
    export declare function get_transaction_statuses(data: usize, dataLen: usize, output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_transaction_effective_fee")
    export declare function get_transaction_effective_fee(data: usize, dataLen: usize, output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_mosaic_id")
    export declare function get_mosaic_id(data: usize, dataLen: usize, output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_supercontract")
    export declare function get_supercontract(output: usize): i64;

    // @ts-ignore: decorator
    @external("env", "get_initiator_pubkey")
    export declare function get_initiator_pubkey(output: usize): i64;
}