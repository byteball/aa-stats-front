/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import { Client } from 'obyte';

interface IGetTemplateParamsArgs {
  /** Definition's params of base_aa */
  params: any;
  /** Obyte.js Client */
  client: Client;
  /** Autotnomous Agent address */
  address: string;
}
export interface ITemplate {
  baseAAs: string[];
  getTemplate: (arg: Record<string, string>) => string;
  getTemplateParams: ({
    params,
    client,
  }: IGetTemplateParamsArgs) => Promise<Record<string, string>>;
}

/** Templates with arguments for base agents and methods for getting assets in accordance with https://docs.google.com/spreadsheets/d/1AeLeNnPKpXS4UXCwqL9rSh9DuvKKGyabji08nmSgBfI/edit#gid=0 */
export const templates: ITemplate[] = [
  // Obyte exchange protocol v2
  {
    baseAAs: [
      'DYZOJKX4MJOQRAUPX7K6WCEV5STMKOHI',
      '2JYYNOSRFGLI3TBI4FVSE6GFBUAZTTI3',
    ],
    getTemplate: ({ x_asset, y_asset }) => `Oswap v2 ${x_asset}-${y_asset}`,
    getTemplateParams: async ({ params }) => {
      const { x_asset = '', y_asset = '' } = params;
      return { x_asset, y_asset };
    },
  },
  // Stability Fund for Bonded Stablecoins.
  {
    baseAAs: ['5WOTEURNL2XGGKD2FGM5HEES4NKVCBCR'],
    getTemplate: ({ asset2 }) =>
      `Stability Fund for Bonded Stablecoin ${asset2}`,
    getTemplateParams: async ({ params, client }) => {
      const { curve_aa = '' } = params;
      const stateVars = await client.api.getAaStateVars({
        address: curve_aa,
      });
      const { asset2 = '' } = stateVars as { asset2: string };
      return { asset2 };
    },
  },
  // Counterstake Bridge Export AA.
  {
    baseAAs: ['DAN6VZNKNZBKJP7GYJST5FMONZOY4FNT'],
    getTemplate: ({ asset }) => `Counterstake Bridge Export ${asset}`,
    getTemplateParams: async ({ params }) => {
      const { asset = '' } = params;
      return { asset };
    },
  },
  // Bonded Stablecoins AA.
  {
    baseAAs: [
      '3DGWRKKWWSC6SV4ZQDWEHYFRYB4TGPKX',
      'GWQVOQDPT4L5XPMDIQF5MNDQZNV5VGLY',
      'CD5DNSVS6ENG5UYILRPJPHAB3YXKA63W',
    ],
    getTemplate: ({ asset2 }) => `Bonded Stablecoin v2 ${asset2}`,
    getTemplateParams: async ({ client, address }) => {
      const stateVars = await client.api.getAaStateVars({ address });
      const { asset2 = '' } = stateVars as { asset2: string };
      return { asset2 };
    },
  },
  // Bonded Stablecoins AA.
  {
    baseAAs: [
      'FCFYMFIOGS363RLDLEWIDBIIBU7M7BHP',
      '3RNNDX57C36E76JLG2KAQSIASAYVGAYG',
    ],
    getTemplate: ({ asset2 }) => `Bonded Stablecoin v1 ${asset2}`,
    getTemplateParams: async ({ client, address }) => {
      const stateVars = await client.api.getAaStateVars({ address });
      const { asset2 = '' } = stateVars as { asset2: string };
      return { asset2 };
    },
  },
  // Bonded Stablecoin Stable AA.
  {
    baseAAs: ['YXPLX6Q3HBBSH2K5HLYM45W7P7HFSEIN'],
    getTemplate: ({ asset }) => `Bonded Stablecoin v2 stable AA for ${asset}`,
    getTemplateParams: async ({ client, address }) => {
      const stateVars = await client.api.getAaStateVars({ address });
      const { asset = '' } = stateVars as { asset: string };
      return { asset };
    },
  },
  // Arbitrage AA for buying/selling T1 tokens for the reserve currency when the price deviates from the peg.
  {
    baseAAs: [
      '7DTJZNB3MHSBVI72CKXRIKONJYBV7I2Z',
      'WQBLYBRAMJVXDWS7BGTUNUTW2STO6LYP',
    ],
    getTemplate: ({ asset1, reserve_asset }) =>
      `Arbitrage AA for buying/selling ${asset1} for ${reserve_asset} when the price deviates from the peg.`,
    getTemplateParams: async ({ params, client }) => {
      const { curve_aa = '' } = params;
      const [stateVars, curveDef] = await Promise.all([
        client.api.getAaStateVars({
          address: curve_aa,
        }),
        client.api.getDefinition(curve_aa),
      ]);
      const { asset1 = '' } = stateVars as { asset1: string };
      const { reserve_asset = '' } = curveDef.at(1).params;
      return { asset1, reserve_asset };
    },
  },
  // Bonded Stablecoin Deposits AA.
  {
    baseAAs: ['GEZGVY4T3LK6N4NJAKNHNQIVAI5OYHPC'],
    getTemplate: ({ asset, asset2 }) =>
      `Bonded Stablecoin Deposits for ${asset}/${asset2}`,
    getTemplateParams: async ({ params, client, address }) => {
      const { curve_aa } = params;
      const [stateVars, stateVarsCurveAA] = await Promise.all([
        client.api.getAaStateVars({ address }),
        client.api.getAaStateVars({ address: curve_aa }),
      ]);
      const { asset = '' } = stateVars as { asset: string };
      const { asset2 = '' } = stateVarsCurveAA as { asset2: string };
      return { asset, asset2 };
    },
  },
  // Counterstake Bridge Export Pooled Assistant AA.
  {
    baseAAs: ['WKGC4O5UPW37XEGQKXPINIXFAXHTYHKL'],
    getTemplate: ({ shares_asset }) =>
      `Counterstake Bridge Export Pooled Assistant ${shares_asset}`,
    getTemplateParams: async ({ client, address }) => {
      const stateVars = await client.api.getAaStateVars({ address });
      const { shares_asset = '' } = stateVars as { shares_asset: string };
      return { shares_asset };
    },
  },
  // Obyte exchange protocol
  {
    baseAAs: [
      'GS23D3GQNNMNJ5TL4Z5PINZ5626WASMA',
      'B22543LKSS35Z55ROU4GDN26RT6MDKWU',
    ],
    getTemplate: ({ asset0, asset1 }) => `Oswap v1 ${asset0}-${asset1}`,
    getTemplateParams: async ({ params }) => {
      const { asset0 = '', asset1 = '' } = params;
      return { asset0, asset1 };
    },
  },
  // Counterstake Bridge Import Pooled Assistant AA.
  {
    baseAAs: [
      'HLSRAK6LGDXLNGXUCB5Z43NCZMVLYTJU',
      'AKZNFCFYJVNMM6WD4A2ZFNLM4EYXUZ2Q',
    ],
    getTemplate: ({ shares_asset }) =>
      `Counterstake Bridge Import Pooled Assistant ${shares_asset}`,
    getTemplateParams: async ({ client, address }) => {
      const stateVars = await client.api.getAaStateVars({ address });
      const { shares_asset = '' } = stateVars as { shares_asset: string };
      return { shares_asset };
    },
  },
  // Bonded Stablecoin Governance AA.
  {
    baseAAs: [
      'JL6OOEOQCJ2RJ3NHCUJLUBDR3ZE3GY3F',
      'Y4VBXMROK5BWBKSYYAMUW7QUEZFXYBCF',
      'UUPBIWDWQ7Q4WXS5CWSEKUQE34FG6L55',
      'LXHUYEV6IHBCTGMFNSWRBBU7DGR3JTIY',
    ],
    getTemplate: ({ asset2 }) => `Bonded Stablecoin Governance for ${asset2}`,
    getTemplateParams: async ({ params, client }) => {
      const { curve_aa = '' } = params;
      const stateVars = await client.api.getAaStateVars({
        address: curve_aa,
      });
      const { asset2 = '' } = stateVars as { asset2: string };
      return { asset2 };
    },
  },
  // Discount Stablecoins AA.
  {
    baseAAs: ['JLLM2AUTHYUS5EW36YVSPDYIDDQRABU6'],
    getTemplate: ({ asset }) => `Discount Stablecoin ${asset}`,
    getTemplateParams: async ({ client, address }) => {
      const stateVars = await client.api.getAaStateVars({ address });
      const { asset = '' } = stateVars as { asset: string };
      return { asset };
    },
  },
  // Prophet prediction markets
  {
    baseAAs: [
      'AXG7G57VBLAHF3WRN5WMQ53KQEQDRONC',
      'A4EH5ZF5L4KEAHQIUSDEQGILHPEFJFPW',
    ],
    getTemplate: ({ yes_asset }) => `Prophet prediction market ${yes_asset}`,
    getTemplateParams: async ({ client, address }) => {
      const stateVars = await client.api.getAaStateVars({ address });
      const { yes_asset = '' } = stateVars as { yes_asset: string };
      return { yes_asset };
    },
  },
  // Counterstake Bridge Import Governance AA.
  {
    baseAAs: ['KDHCTQOTKTO6MLYOCU6OCBI7KK72DV3P'],
    getTemplate: ({ asset }) =>
      `Counterstake Bridge Import Governance AA for ${asset}`,
    getTemplateParams: async ({ params, client }) => {
      const { import_aa = '' } = params;
      const stateVars = await client.api.getAaStateVars({
        address: import_aa,
      });
      const { asset = '' } = stateVars as { asset: string };
      return { asset };
    },
  },
  // Bonded Stablecoin Decision Engine AA.
  {
    baseAAs: [
      'QXHLP4MLXSWHJGD3WUBFTXQSIA2R3QFG',
      '625UKTER5WR5JQPQYS7CU4ST2EXFUCDG',
      'R3WZUWKTFISJ53MGAGSS5OIVMDAFC3WV',
    ],
    getTemplate: ({ asset2 }) =>
      `Bonded Stablecoin Decision Engine AA for ${asset2}`,
    getTemplateParams: async ({ params, client }) => {
      const { curve_aa = '' } = params;
      const stateVars = await client.api.getAaStateVars({
        address: curve_aa,
      });
      const { asset2 = '' } = stateVars as { asset2: string };
      return { asset2 };
    },
  },
  // Counterstake Bridge Import AA.
  {
    baseAAs: [
      'HNAFSLWSZDU2B2PLFIUNRZLGS4F2AUIL',
      'DFMD744IOZQFN2MUCQFTSBEALINHZMXO',
    ],
    getTemplate: ({ asset }) => `Counterstake Bridge Import ${asset}`,
    getTemplateParams: async ({ client, address }) => {
      const stateVars = await client.api.getAaStateVars({ address });
      const { asset = '' } = stateVars as { asset: string };
      return { asset };
    },
  },
];
