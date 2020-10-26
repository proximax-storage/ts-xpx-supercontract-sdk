import {Encoder, Encodable} from "./common";

function toHexString(buf: ArrayBuffer): string {
    const bytes = Uint8Array.wrap(buf);
    let result = "";
    for (let i = 0; i < bytes.byteLength; ++i) {
        result += bytes[i].toString(16);
    }

    return result;
}

export namespace transactions {
    enum MosaicPropertyId {
        MosaicPropertyFlagsId,
        MosaicPropertyDivisibilityId,
        MosaicPropertyDurationId
    }

    class MosaicProperty extends Encodable {
        Id: MosaicPropertyId;
        Value: i64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setInteger("Id", this.Id);
            encoder.setInteger("Value", this.Value);
            encoder.popObject();
        }
    }

    class MosaicProperties extends Encodable {
        SupplyMutable: bool;
        Transferable: bool;
        Divisibility: u8;
        OptionalProperties: Array<MosaicProperty> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setBoolean("SupplyMutable", this.SupplyMutable);
            encoder.setBoolean("Transferable", this.Transferable);
            encoder.setInteger("Divisibility", this.Divisibility);

            encoder.setArray("OptionalProperties", this.OptionalProperties);
            encoder.popObject();
        }
    }

    class MosaicDefinition extends Encodable {
        Nonce: u32;
        OwnerPublicKey: string = "";
        MosaicProps: MosaicProperties | null;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("Nonce", this.Nonce);
            encoder.setString("OwnerPublicKey", this.OwnerPublicKey);

            if (this.MosaicProps) {
                encoder.pushObject("MosaicProps", this.MosaicProps!);
            }

            encoder.popObject();
        }
    }

    enum AliasActionType {
        AliasLink,
        AliasUnlink
    }

    class AddressAlias extends Encodable {
        Address: string = "";
        NamespaceId: u64;
        ActionType: AliasActionType;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("Address", toHexString(String.UTF8.encode(this.Address)));
            encoder.setUInteger("NamespaceId", this.NamespaceId);
            encoder.setInteger("ActionType", this.ActionType);

            encoder.popObject();
        }
    }

    class MosaicAlias extends Encodable {
        MosaicId: u64;
        NamespaceId: u64;
        ActionType: AliasActionType;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("MosaicId", this.MosaicId);
            encoder.setUInteger("NamespaceId", this.NamespaceId);
            encoder.setInteger("ActionType", this.ActionType);

            encoder.popObject();
        }
    }

    class Mosaic extends Encodable {
        AssetId: u64;
        Amount: u64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("AssetId", this.AssetId);
            encoder.setUInteger("Amount", this.Amount);
            encoder.popObject();
        }
    }

    enum OfferType {
        SellOffer,
        BuyOffer,
        UnknownType
    }

    class AddOffer extends Encodable {
        OfferType: OfferType;
        Mosaic: Mosaic = new Mosaic();
        Cost: u64;
        Duration: u64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("OfferType", this.OfferType);
            encoder.setUInteger("Cost", this.Cost);
            encoder.setUInteger("Duration", this.Duration);
            encoder.pushObject("Mosaic", this.Mosaic);

            encoder.popObject();
        }
    }

    class AddExchangeOffer extends Encodable {
        AddOffers: Array<AddOffer> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setArray("AddOffers", this.AddOffers);
            encoder.popObject();
        }
    }

    class PublicAccount extends Encodable {
        PublicKey: string = "";

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("PublicKey", this.PublicKey);
            encoder.popObject();
        }
    }

    class ExchangeConfirmation extends Encodable {
        OfferType: OfferType;
        Mosaic: Mosaic = new Mosaic();
        Cost: u64;
        Owner: PublicAccount = new PublicAccount();

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("OfferType", this.OfferType);
            encoder.setUInteger("Cost", this.Cost);
            encoder.pushObject("Mosaic", this.Mosaic);
            encoder.pushObject("Owner", this.Owner);
            encoder.popObject();
        }
    }

    class ExchangeOffer extends Encodable {
        Offer: Array<ExchangeConfirmation> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setArray("Offer", this.Offer);
            encoder.popObject();
        }
    }

    class Transfer extends Encodable {
        Address: string = "";
        AssetId: u64;
        Amount: u64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("AssetId", this.AssetId);
            encoder.setUInteger("Amount", this.Amount);
            encoder.setString("PubKey", this.Address);
            encoder.popObject();
        }
    }

    class RemoveOffer extends Encodable {
        OfferType: OfferType;
        AssetId: u64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("AssetId", this.AssetId);
            encoder.setUInteger("OfferType", this.OfferType);
            encoder.popObject();
        }
    }

    class RemoveExchangeOffer extends Encodable {
        RemoveOffers: Array<RemoveOffer> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setArray("RemoveOffer", this.RemoveOffers);
            encoder.popObject();
        }
    }

    enum MosaicSupplyType {
        Decrease,
        Increase
    }

    class MosaicSupplyChange extends Encodable {
        SupplyType: MosaicSupplyType;
        AssetId: u64;
        Delta: u64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("SupplyType", this.SupplyType);
            encoder.setUInteger("AssetId", this.AssetId);
            encoder.setUInteger("Delta", this.Delta);
            encoder.popObject();
        }
    }

    class RegisterRootNamespace extends Encodable {
        NamespaceName: string = "";
        Duration: u64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("NamespaceName", this.NamespaceName);
            encoder.setUInteger("Duration", this.Duration);
            encoder.popObject();
        }
    }

    class RegisterSubNamespace extends Encodable {
        NamespaceName: string = "";
        ParentId: u64 = 0;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("NamespaceName", this.NamespaceName);
            if (this.ParentId) {
                encoder.setUInteger("ParentId", this.ParentId);
            }
            encoder.popObject();
        }
    }

    enum HashType {
        // / Input is hashed using Sha-3-256.
        SHA3_256,
        // / Input is hashed using Keccak-256.
        KECCAK_256,
        // / Input is hashed twice: first with SHA-256 and then with RIPEMD-160.
        HASH_160,
        // / Input is hashed twice with SHA-256.
        SHA_256,
        // / Internal type inside of blockchain
        Internal_Hash_Type
    }

    class Secret extends Encodable {
        Hash: string = "";
        HashType: HashType;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("Hash", this.Hash);
            encoder.setUInteger("HashType", this.HashType);
            encoder.popObject();
        }
    }

    class SecretLock extends Encodable {
        Mosaic: Mosaic = new Mosaic();
        Duration: u64;
        Secret: Secret = new Secret();
        Recipient: string = "";

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("Recipient", toHexString(String.UTF8.encode(this.Recipient)));
            encoder.setUInteger("Duration", this.Duration);
            encoder.pushObject("Mosaic", this.Mosaic);
            encoder.pushObject("Secret", this.Secret);
            encoder.popObject();
        }
    }

    class Proof extends Encodable {
        Data: Array<u8> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setArray("Data", this.Data);
            encoder.popObject();
        }
    }

    class SecretProof extends Encodable {
        HashType: HashType;
        Proof: Proof = new Proof();
        Recipient: string = "";

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("Recipient", toHexString(String.UTF8.encode(this.Recipient)));
            encoder.setUInteger("HashType", this.HashType);
            encoder.pushObject("Proof", this.Proof);
            encoder.popObject();
        }
    }

    class TransferWithNamespace extends Encodable {
        Message: string = "";
        Mosaics: Array<Mosaic> = [];
        Recipient: u64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("Message", this.Message);
            encoder.setUInteger("Recipient", this.Recipient);
            encoder.setArray("Mosaic", this.Mosaics);
            encoder.popObject();
        }
    }

    enum MetadataModificationType {
        AddMetadata,
        RemoveMetadata
    }

    class MetadataModification extends Encodable {
        Type: MetadataModificationType;
        Key: string = "";
        Value: string = "";

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("Key", this.Key);
            encoder.setString("Value", this.Value);
            encoder.setUInteger("Type", this.Type);
            encoder.popObject();
        }
    }

    class ModifyMetadataAddress extends Encodable {
        Address: string = "";
        MetadataModifications: Array<MetadataModification> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("Address", toHexString(String.UTF8.encode(this.Address)));
            encoder.setArray("MetadataModification", this.MetadataModifications);
            encoder.popObject();
        }
    }

    class ModifyMetadataMosaic extends Encodable {
        MosaicId: u64;
        MetadataModifications: Array<MetadataModification> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("MosaicId", this.MosaicId);
            encoder.setArray("MetadataModification", this.MetadataModifications);
            encoder.popObject();
        }
    }

    class ModifyMetadataNamespace extends Encodable {
        NamespaceId: u64;
        MetadataModifications: Array<MetadataModification> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("NamespaceId", this.NamespaceId);
            encoder.setArray("MetadataModification", this.MetadataModifications);
            encoder.popObject();
        }
    }
}