import ExchangePointsModal from "@/components/custom/account/ExchangePointsModal";
import { getWalletDetails } from "@/lib/api/apiWallet";
import getLocaleStrings from "@/localization";
import { wallet } from "@/types";
import { ShieldX } from "lucide-react";

const Wallet = async () => {
  const walletDetailsResponse = await getWalletDetails();
  const locale = await getLocaleStrings();
  if (!walletDetailsResponse.success)
    return (
      <div className="bg-red-500/80 rounded-sm border border-red-500 px-4 py-2 text-white w-fit flex items-center gap-3">
        <ShieldX />
        {locale.failedToLoadWalletDetails}
      </div>
    );

  const walletDetails = walletDetailsResponse.data as wallet;
  return (
    <div className="space-y-8 px-3">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            {locale.yourWallet}
          </h2>
          <ExchangePointsModal
            availablePoints={walletDetails.available_points}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg shadow-sm bg-teal-300/50">
            <h3 className="text-lg font-medium">{locale.currentBalance}</h3>
            <p className="text-2xl font-bold mt-2">
              {walletDetails.wallet_balance}
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">{locale.totalPoints}</h3>
            <p className="text-2xl font-bold mt-2">
              {walletDetails.total_points}
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">{locale.availablePoints}</h3>
            <p className="text-2xl font-bold mt-2">
              {walletDetails.available_points}
            </p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          {walletDetails.point_transctions.length > 0 ? (
            <>
              <h3 className="text-lg font-medium">
                {locale.transactionHistory}
              </h3>
              <ul className="space-y-2">
                {walletDetails.point_transctions.map((transaction) => (
                  <li
                    key={transaction.id}
                    className="p-4 border rounded-lg shadow-sm"
                  >
                    <p className="text-sm text-gray-500">
                      {transaction.created_at}
                    </p>
                    <p className="font-bold">
                      {transaction.points} {locale.points}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.description}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500">{locale.noTransactionsYet}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
