import {extern} from "./env";
import {Encodable, Encoder, Options, Result, Status} from "./common";
import {loadData} from "./internal"
import {transactions} from "./transactions";

export function upload_transaction(tx: Encodable, f: (data: usize, dataLen: usize) => i64): Status {
    const encoder = new Encoder();
    tx.encode(encoder);
    const bytes = String.UTF8.encode(encoder.toString());
    const result = f(changetype<usize>(bytes), bytes.byteLength);
    if (result < 0) {
        return Status.ErrorExternalFunctionExecution;
    }

    return Status.Success;
}

export namespace blockchain {
    /**
     * Flush transactions from pool to blockchain.
     *
     * @returns Status about this operation
     */
    export function flush(): Status {
        const result = extern.flush();
        if (result < 0) {
            return Status.ErrorExternalFunctionExecution;
        }

        return Status.Success;
    }

    /**
     * Add MosaicDefinition to pool of transactions.
     *
     * @param {transactions.MosaicDefinition} tx - MosaicDefinition transaction
     * @returns {Status} status of this operation
     */
    export function mosaic_definition(tx: transactions.MosaicDefinition): Status {
        return upload_transaction(tx, extern.mosaic_definition);
    }

    /**
     * Add AddressAlias to pool of transactions.
     *
     * @param {transactions.AddressAlias} tx - AddressAlias transaction
     * @returns {Status} status of this operation
     */
    export function address_alias(tx: transactions.AddressAlias): Status {
        return upload_transaction(tx, extern.address_alias);
    }

    /**
     * Add MosaicAlias to pool of transactions.
     *
     * @param {transactions.MosaicAlias} tx - MosaicAlias transaction
     * @returns {Status} status of this operation
     */
    export function mosaic_alias(tx: transactions.MosaicAlias): Status {
        return upload_transaction(tx, extern.mosaic_alias);
    }

    /**
     * Add AddExchangeOffer to pool of transactions.
     *
     * @param {transactions.AddExchangeOffer} tx - AddExchangeOffer transaction
     * @returns {Status} status of this operation
     */
    export function add_exchange_offer(tx: transactions.AddExchangeOffer): Status {
        return upload_transaction(tx, extern.add_exchange_offer);
    }

    /**
     * Add ExchangeOffer to pool of transactions.
     *
     * @param {transactions.ExchangeOffer} tx - ExchangeOffer transaction
     * @returns {Status} status of this operation
     */
    export function exchange_offer(tx: transactions.ExchangeOffer): Status {
        return upload_transaction(tx, extern.exchange_offer);
    }

    /**
     * Add Transfer to pool of transactions.
     *
     * @param {transactions.Transfer} tx - Transfer transaction
     * @returns {Status} status of this operation
     */
    export function transfer(tx: transactions.Transfer): Status {
        return upload_transaction(tx, extern.transfer);
    }

    /**
     * Add RemoveExchangeOffer to pool of transactions.
     *
     * @param {transactions.RemoveExchangeOffer} tx - RemoveExchangeOffer transaction
     * @returns {Status} status of this operation
     */
    export function remove_exchange_offer(tx: transactions.RemoveExchangeOffer): Status {
        return upload_transaction(tx, extern.remove_exchange_offer);
    }

    /**
     * Add MosaicSupplyChange to pool of transactions.
     *
     * @param {transactions.MosaicSupplyChange} tx - MosaicSupplyChange transaction
     * @returns {Status} status of this operation
     */
    export function mosaic_supply_change(tx: transactions.MosaicSupplyChange): Status {
        return upload_transaction(tx, extern.mosaic_supply_change);
    }

    /**
     * Add RegisterRootNamespace to pool of transactions.
     *
     * @param {transactions.RegisterRootNamespace} tx - RegisterRootNamespace transaction
     * @returns {Status} status of this operation
     */
    export function register_root_namespace(tx: transactions.RegisterRootNamespace): Status {
        return upload_transaction(tx, extern.register_root_namespace);
    }

    /**
     * Add RegisterSubNamespace to pool of transactions.
     *
     * @param {transactions.RegisterSubNamespace} tx - RegisterSubNamespace transaction
     * @returns {Status} status of this operation
     */
    export function register_sub_namespace(tx: transactions.RegisterSubNamespace): Status {
        return upload_transaction(tx, extern.register_sub_namespace);
    }

    /**
     * Add SecretLock to pool of transactions.
     *
     * @param {transactions.SecretLock} tx - SecretLock transaction
     * @returns {Status} status of this operation
     */
    export function secret_lock(tx: transactions.SecretLock): Status {
        return upload_transaction(tx, extern.secret_lock);
    }

    /**
     * Add SecretProof to pool of transactions.
     *
     * @param {transactions.SecretProof} tx - SecretProof transaction
     * @returns {Status} status of this operation
     */
    export function secret_proof(tx: transactions.SecretProof): Status {
        return upload_transaction(tx, extern.secret_proof);
    }

    /**
     * Add TransferWithNamespace to pool of transactions.
     *
     * @param {transactions.TransferWithNamespace} tx - TransferWithNamespace transaction
     * @returns {Status} status of this operation
     */
    export function transfer_with_namespace(tx: transactions.TransferWithNamespace): Status {
        return upload_transaction(tx, extern.transfer_with_namespace);
    }

    /**
     * Add ModifyMetadataAddress to pool of transactions.
     *
     * @param {transactions.ModifyMetadataAddress} tx - ModifyMetadataAddress transaction
     * @returns {Status} status of this operation
     */
    export function modify_metadata_address(tx: transactions.ModifyMetadataAddress): Status {
        return upload_transaction(tx, extern.modify_metadata_address);
    }

    /**
     * Add ModifyMetadataMosaic to pool of transactions.
     *
     * @param {transactions.ModifyMetadataMosaic} tx - ModifyMetadataMosaic transaction
     * @returns {Status} status of this operation
     */
    export function modify_metadata_mosaic(tx: transactions.ModifyMetadataMosaic): Status {
        return upload_transaction(tx, extern.modify_metadata_mosaic);
    }

    /**
     * Add ModifyMetadataNamespace to pool of transactions.
     *
     * @param {transactions.ModifyMetadataNamespace} tx - ModifyMetadataNamespace transaction
     * @returns {Status} status of this operation
     */
    export function modify_metadata_namespace(tx: transactions.ModifyMetadataNamespace): Status {
        return upload_transaction(tx, extern.modify_metadata_namespace);
    }
}