/* eslint-disable no-unused-vars */
interface IAgentItemProps {
  address: string;
  usd_amount_in: number;
  usd_amount_out: number;
  usd_balance: number;
  onNavigate: (address: string) => () => void;
}
