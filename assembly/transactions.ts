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
    export enum MosaicPropertyId {
        MosaicPropertyFlagsId,
        MosaicPropertyDivisibilityId,
        MosaicPropertyDurationId
    }

    export class MosaicProperty extends Encodable {
        Id: MosaicPropertyId;
        Value: i64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setInteger("Id", this.Id);
            encoder.setInteger("Value", this.Value);
            encoder.popObject();
        }
    }

    export class MosaicProperties extends Encodable {
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

    export class MosaicDefinition extends Encodable {
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

    export enum AliasActionType {
        AliasLink,
        AliasUnlink
    }

    export class AddressAlias extends Encodable {
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

    export class MosaicAlias extends Encodable {
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

    export class Mosaic extends Encodable {
        AssetId: u64;
        Amount: u64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("AssetId", this.AssetId);
            encoder.setUInteger("Amount", this.Amount);
            encoder.popObject();
        }
    }

    export enum OfferType {
        SellOffer,
        BuyOffer,
        UnknownType
    }

    export class AddOffer extends Encodable {
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

    export class AddExchangeOffer extends Encodable {
        AddOffers: Array<AddOffer> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setArray("AddOffers", this.AddOffers);
            encoder.popObject();
        }
    }

    export class PublicAccount extends Encodable {
        PublicKey: string = "";

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("PublicKey", this.PublicKey);
            encoder.popObject();
        }
    }

    export class ExchangeConfirmation extends Encodable {
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

    export class ExchangeOffer extends Encodable {
        Offer: Array<ExchangeConfirmation> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setArray("Offer", this.Offer);
            encoder.popObject();
        }
    }

    export class Transfer extends Encodable {
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

    export class RemoveOffer extends Encodable {
        OfferType: OfferType;
        AssetId: u64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("AssetId", this.AssetId);
            encoder.setUInteger("OfferType", this.OfferType);
            encoder.popObject();
        }
    }

    export class RemoveExchangeOffer extends Encodable {
        RemoveOffers: Array<RemoveOffer> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setArray("RemoveOffer", this.RemoveOffers);
            encoder.popObject();
        }
    }

    export enum MosaicSupplyType {
        Decrease,
        Increase
    }

    export class MosaicSupplyChange extends Encodable {
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

    export class RegisterRootNamespace extends Encodable {
        NamespaceName: string = "";
        Duration: u64;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("NamespaceName", this.NamespaceName);
            encoder.setUInteger("Duration", this.Duration);
            encoder.popObject();
        }
    }

    export class RegisterSubNamespace extends Encodable {
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

    export enum HashType {
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

    export class Secret extends Encodable {
        Hash: string = "";
        HashType: HashType;

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("Hash", this.Hash);
            encoder.setUInteger("HashType", this.HashType);
            encoder.popObject();
        }
    }

    export class SecretLock extends Encodable {
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

    export class Proof extends Encodable {
        Data: Array<u8> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setArray("Data", this.Data);
            encoder.popObject();
        }
    }

    export class SecretProof extends Encodable {
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

    export class TransferWithNamespace extends Encodable {
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

    export enum MetadataModificationType {
        AddMetadata,
        RemoveMetadata
    }

    export class MetadataModification extends Encodable {
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

    export class ModifyMetadataAddress extends Encodable {
        Address: string = "";
        MetadataModifications: Array<MetadataModification> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setString("Address", toHexString(String.UTF8.encode(this.Address)));
            encoder.setArray("MetadataModification", this.MetadataModifications);
            encoder.popObject();
        }
    }

    export class ModifyMetadataMosaic extends Encodable {
        MosaicId: u64;
        MetadataModifications: Array<MetadataModification> = [];

        encode(encoder: Encoder): void {
            encoder.pushObject();
            encoder.setUInteger("MosaicId", this.MosaicId);
            encoder.setArray("MetadataModification", this.MetadataModifications);
            encoder.popObject();
        }
    }

    export class ModifyMetadataNamespace extends Encodable {
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