import { utils, transactions, blockchain, Status } from "../assembly/index";

export function all_transactions(): i64 {
    mosaic_definition();
    address_alias();
    mosaic_alias();
    add_offer();
    exchange_offer();
    transfer();
    remove_offer();
    supply_change();
    register_root();
    register_sub();
    secret_lock();
    secret_proof();
    transfer_namespace();
    metadata_address();
    metadata_mosaic();
    metadata_namespace();

    return Status.Success;
}

export function mosaic_definition(): i64 {
    const tx = new transactions.MosaicDefinition();
    tx.Nonce = 99;
    tx.OwnerPublicKey = "0EB448D07C7CCB312989AC27AA052738FF589E2F83973F909B506B450DC5C4E2";
    tx.MosaicProps = new transactions.MosaicProperties();
    tx.MosaicProps!.Transferable = true;
    tx.MosaicProps!.SupplyMutable = true;
    tx.MosaicProps!.Divisibility = 6;
    const property = new transactions.MosaicProperty();
    property.Id = transactions.MosaicPropertyId.MosaicPropertyDurationId;
    property.Value = 100000;
    tx.MosaicProps!.OptionalProperties.push(property);

    utils.debug(tx.toString());

    return blockchain.mosaic_definition(tx);
}

const NamespaceBit: u64 = u64(1) << 63;

export function address_alias(): i64 {
    const tx = new transactions.AddressAlias();
    tx.Address = "SCPNZICWMYWVHVSYQHJ65EMKWYT7FZSPAKP4UPEN";
    tx.NamespaceId = 30 | NamespaceBit;
    tx.ActionType = transactions.AliasActionType.AliasLink;

    utils.debug(tx.toString());
    blockchain.address_alias(tx);

    return Status.Success;
}

export function mosaic_alias(): i64 {
    const tx = new transactions.MosaicAlias();
    tx.MosaicId = 30;
    tx.NamespaceId = 20 | NamespaceBit;
    tx.ActionType = transactions.AliasActionType.AliasLink;

    utils.debug(tx.toString());

    return blockchain.mosaic_alias(tx);
}

export function add_offer(): i64 {
    const tx = new transactions.AddExchangeOffer();
    const offer = new transactions.AddOffer();
    offer.Cost = 200;
    offer.Duration = 3000;
    offer.OfferType = transactions.OfferType.BuyOffer;
    offer.Mosaic.Amount = 1000;
    offer.Mosaic.AssetId = 0x4232;

    tx.AddOffers.push(offer);

    utils.debug(tx.toString());

    return blockchain.add_exchange_offer(tx);
}

export function exchange_offer(): i64 {
    const tx = new transactions.ExchangeOffer();
    const offer = new transactions.ExchangeConfirmation();
    offer.Cost = 200;
    offer.OfferType = transactions.OfferType.BuyOffer;
    offer.Mosaic.Amount = 1000;
    offer.Mosaic.AssetId = 0x4232;
    offer.Owner.PublicKey = "68F50E10E5B8BE2B7E9DDB687A667D6E94DD55FE02B4AED8195F51F9A242558B";

    tx.Offer.push(offer);

    utils.debug(tx.toString());

    return blockchain.exchange_offer(tx);
}

export function transfer(): i64 {
    const tx = new transactions.Transfer();
    tx.Address = "SCPNZICWMYWVHVSYQHJ65EMKWYT7FZSPAKP4UPEN";
    tx.Amount = 1000;
    tx.AssetId = 0xFAF2;

    utils.debug(tx.toString());
    return blockchain.transfer(tx);
}

export function remove_offer(): i64 {
    const tx = new transactions.RemoveExchangeOffer();
    const offer = new transactions.RemoveOffer();
    offer.AssetId = 0xF2fA;
    offer.OfferType = transactions.OfferType.SellOffer;

    tx.RemoveOffers.push(offer);

    utils.debug(tx.toString());
    return blockchain.remove_exchange_offer(tx);
}

export function supply_change(): i64 {
    const tx = new transactions.MosaicSupplyChange();
    tx.AssetId = 0xf2af;
    tx.Delta = 123456;
    tx.SupplyType = transactions.MosaicSupplyType.Increase;

    utils.debug(tx.toString());
    return blockchain.mosaic_supply_change(tx);
}

export function register_root(): i64 {
    const tx = new transactions.RegisterRootNamespace();
    tx.Duration = 2222;
    tx.NamespaceName = "jojo";

    utils.debug(tx.toString());
    return blockchain.register_root_namespace(tx);
}

export function register_sub(): i64 {
    const tx = new transactions.RegisterSubNamespace();
    tx.ParentId = 0xFF22 | NamespaceBit;
    tx.NamespaceName = "panda";

    utils.debug(tx.toString());
    return blockchain.register_sub_namespace(tx);
}

export function secret_lock(): i64 {
    const tx = new transactions.SecretLock();
    tx.Duration = 10000;
    tx.Mosaic.AssetId = 0xFFaa;
    tx.Mosaic.Amount = 2000;
    tx.Recipient = "SCPNZICWMYWVHVSYQHJ65EMKWYT7FZSPAKP4UPEN";
    tx.Secret.HashType = transactions.HashType.SHA3_256;
    tx.Secret.Hash = "hellosecret";

    utils.debug(tx.toString());
    return blockchain.secret_lock(tx);
}

export function secret_proof(): i64 {
    const tx = new transactions.SecretProof();
    tx.HashType = transactions.HashType.SHA3_256;
    tx.Recipient = "SCPNZICWMYWVHVSYQHJ65EMKWYT7FZSPAKP4UPEN";
    tx.Proof.Data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    utils.debug(tx.toString());
    return blockchain.secret_proof(tx);
}

export function transfer_namespace(): i64 {
    const tx = new transactions.TransferWithNamespace();
    tx.Message = "Hello world";
    const mosaic = new transactions.Mosaic();
    mosaic.Amount = 1234;
    mosaic.AssetId = 0xaa22;
    tx.Mosaics.push(mosaic);
    tx.Recipient = 0xFF22 | NamespaceBit;

    utils.debug(tx.toString());
    return blockchain.transfer_with_namespace(tx);
}

export function metadata_address(): i64 {
    const tx = new transactions.ModifyMetadataAddress();
    tx.Address = "SCPNZICWMYWVHVSYQHJ65EMKWYT7FZSPAKP4UPEN";
    const modification = new transactions.MetadataModification();
    modification.Key = "hello";
    modification.Value = "world";
    modification.Type = transactions.MetadataModificationType.AddMetadata;
    tx.MetadataModifications.push(modification);

    utils.debug(tx.toString());
    return blockchain.modify_metadata_address(tx);
}

export function metadata_mosaic(): i64 {
    const tx = new transactions.ModifyMetadataMosaic();
    tx.MosaicId = 0xff22;
    const modification = new transactions.MetadataModification();
    modification.Key = "hello1";
    modification.Value = "world1";
    modification.Type = transactions.MetadataModificationType.AddMetadata;
    tx.MetadataModifications.push(modification);

    utils.debug(tx.toString());
    return blockchain.modify_metadata_mosaic(tx);
}

export function metadata_namespace(): i64 {
    const tx = new transactions.ModifyMetadataNamespace();
    tx.NamespaceId = 0xffaa | NamespaceBit;
    const modification = new transactions.MetadataModification();
    modification.Key = "hello2";
    modification.Value = "world2";
    modification.Type = transactions.MetadataModificationType.AddMetadata;
    tx.MetadataModifications.push(modification);

    utils.debug(tx.toString());
    return blockchain.modify_metadata_namespace(tx);
}