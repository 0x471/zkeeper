"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Nullifier, ProviderError } from "@aurowallet/mina-provider";

export interface FaucetProps {
  wallet?: string;
  loading: boolean;
  onConnectWallet: () => void;
  onDrip: () => void;
}

export async function Faucet({
  wallet,
  onConnectWallet,
  onDrip,
  loading,
}: FaucetProps) {
  const form = useForm();

  const handleClick = async () => {
    wallet ?? onConnectWallet();

    if (wallet) {
      const signResult: Nullifier | ProviderError = await window.mina
        ?.createNullifier({
          message: ["1337"],
        })
        .catch((err: any) => err);

      console.log("nullifier:", signResult);

      //onDrip();
    }
  };

  return (
    <Card className="w-full p-4 mt-40 mb-10 !z-0 ">
      <div className="mb-2">
        <h2 className="text-xl font-bold items-center">Faucet</h2>
      
      </div>
      <Form {...form}>
        <div className="pt-3">
          <FormField
            name="to"
            render={({ field }) => (
              <FormItem>
               
                <FormControl>
                  <Input className="w-full"
                    disabled
                    placeholder={wallet ?? "Please connect a wallet first"}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          size={"lg"}
          type="submit"
          className="mt-6 w-full"
          loading={loading}
          onClick={handleClick}
        >
          {wallet ? "Drip 💦" : "Connect wallet"}
        </Button>
      </Form>
    </Card>
  );
}