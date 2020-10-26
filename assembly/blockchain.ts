import {extern} from "./env";
import {Encodable, Encoder, Options, Result, Status} from "./common";
import {loadData} from "./internal"
import {transactions} from "./transactions";

function upload_transaction(tx: Encodable, f: (data: usize, dataLen: usize) => i64): Status {
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
    function flush(): Status {
        const result = extern.flush();
        if (result < 0) {
            return Status.ErrorExternalFunctionExecution;
        }

        return Status.Success;
    }

    function mosaic_definition(tx: transactions.MosaicDefinition): Status {
        return upload_transaction(tx, extern.mosaic_definition);
    }

    function address_alias(tx: transactions.AddressAlias): Status {
        return upload_transaction(tx, extern.address_alias);
    }

    function mosaic_alias(tx: transactions.MosaicAlias): Status {
        return upload_transaction(tx, extern.mosaic_alias);
    }

    function add_exchange_offer(tx: transactions.AddExchangeOffer): Status {
        return upload_transaction(tx, extern.add_exchange_offer);
    }

    function exchange_offer(tx: transactions.ExchangeOffer): Status {
        return upload_transaction(tx, extern.exchange_offer);
    }

    function transfer(tx: transactions.Transfer): Status {
        return upload_transaction(tx, extern.transfer);
    }

    function remove_exchange_offer(tx: transactions.RemoveExchangeOffer): Status {
        return upload_transaction(tx, extern.remove_exchange_offer);
    }

    function mosaic_supply_change(tx: transactions.MosaicSupplyChange): Status {
        return upload_transaction(tx, extern.mosaic_supply_change);
    }

    function register_root_namespace(tx: transactions.RegisterRootNamespace): Status {
        return upload_transaction(tx, extern.register_root_namespace);
    }

    function register_sub_namespace(tx: transactions.RegisterSubNamespace): Status {
        return upload_transaction(tx, extern.register_sub_namespace);
    }

    function secret_lock(tx: transactions.SecretLock): Status {
        return upload_transaction(tx, extern.secret_lock);
    }

    function secret_proof(tx: transactions.SecretProof): Status {
        return upload_transaction(tx, extern.secret_proof);
    }

    function transfer_with_namespace(tx: transactions.TransferWithNamespace): Status {
        return upload_transaction(tx, extern.transfer_with_namespace);
    }

    function modify_metadata_address(tx: transactions.ModifyMetadataAddress): Status {
        return upload_transaction(tx, extern.modify_metadata_address);
    }

    function modify_metadata_mosaic(tx: transactions.ModifyMetadataMosaic): Status {
        return upload_transaction(tx, extern.modify_metadata_mosaic);
    }

    function modify_metadata_namespace(tx: transactions.ModifyMetadataNamespace): Status {
        return upload_transaction(tx, extern.modify_metadata_namespace);
    }
}