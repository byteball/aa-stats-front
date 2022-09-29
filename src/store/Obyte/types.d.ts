interface IObyteSlice {
  agentsCache: Record<string, IAgentCache>;
  assetsCache: Record<string, string>;
}

interface IAgentCache {
  addresses: Record<string, IAddressEntity>;
  definition?: IDefinition;
}

interface IAddressEntity {
  assets?: Record<string, IAssetEntity>;
}

interface IDefinition {
  description: string;
  homepage_url?: string;
  source_url?: string;
  version?: string;
  field_descriptions?: Record<string, string>;
}

interface IBaseAAData {
  base_aa: string;
  addresses: IAddressInfo[];
}

interface IAssetEntity {
  value: string;
  symbol?: string;
}
interface IAddressInfo extends Record<string, IAssetEntity> {
  address: string;
  tvl: number;
}

interface IDefinedBaseAAData extends IBaseAAData {
  definition: IDefinition;
}

interface IAddressWithBaseAA {
  address: string;
  base_aa: string;
}

interface IAddressWithTemplatedAssetInfo extends IAddressWithBaseAA {
  assets: Record<string, string>;
}

interface IAddressWithTemplatedAssetEntity extends IAddressWithBaseAA {
  assets: Record<string, IAssetEntity>;
}

interface IBaseAAWithDefinition {
  base_aa: string;
  definition: IDefinition;
}
