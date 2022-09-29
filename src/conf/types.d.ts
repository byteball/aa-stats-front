interface IAADefinition {
  base_aa?: string;
  doc_url?: string;
}

interface assetUiControl {
  value: assetsTypes;
  label: string;
  icon: string;
}

interface IAssetsIconsConf {
  icon: string;
  assets: assetsTypes[];
}
