import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiKey } from 'conf/constants';
import { apiGet } from 'lib/api';

export const getAssetsMetadata = createAsyncThunk<Record<string, string>, void>(
  'AAstats/getAssetsMetadata',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGet<AssetsResponseType>(`${apiKey}assets`);
      return Object.keys(response).reduce(
        (result: Record<string, string>, asset) =>
          Object.assign(result, { [asset]: response[asset].name }),
        {}
      );
    } catch (e) {
      return rejectWithValue(new Error('Get Assets Metadata error'));
    }
  }
);
