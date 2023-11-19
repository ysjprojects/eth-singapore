"use client";

import { Flex } from "@/components/shared/flex";
import { useUserContext } from "@/contexts/userContext";
import { useBetterRouter } from "@/hooks/useBetterRouter";
import { formatToDisplayString, shortAddress } from "@/lib/utils";
import { ContentCopy, CopyAll, Refresh } from "@mui/icons-material";
import { Button, Card, IconButton, Link, Skeleton, Typography, useTheme } from "@mui/joy";
import NextLink from "next/link";
import { toast } from "react-toastify";

export default function FundPage() {
  const theme = useTheme();
  const router = useBetterRouter();
  const { address, balance, refetchBalance, balanceIsLoading } = useUserContext();
  return (
    <Flex y gap={4}>
      <Flex y>
        <Typography textColor="neutral.800" level="h2" whiteSpace="pre-line">
          Deposit funds
        </Typography>
        <Typography level="body-sm" mt={1}>
          Builder.fi is built on Base and uses ETH to buy and sell keys. You need to transfer at least 0.001 ETH to your
          new builder.fi address. If you don&apos;t have funds on Base, please bridge from other network first. Don't
          know how? Check this{" "}
          <a
            href="https://www.notion.so/talentprotocol/builder-fi-FAQ-dcebfe7103b34d11aba90de032173b39#0ca25dc581354952abe8a2b327360f94"
            target="_blank"
          >
            guide
          </a>
          .
        </Typography>
      </Flex>

      <Flex y gap2>
        <Flex x yc xsb component={Card}>
          <Flex x yc gap3>
            <CopyAll fontSize="large" />
            <Flex y gap1>
              <Typography level="title-md">Step 1: Add ETH to Base</Typography>
              <Typography level="body-sm">If you don&apos;t have any ETH on Base</Typography>
            </Flex>
          </Flex>
          <NextLink href="https://www.bungee.exchange/" target="_blank">
            <Link>Swap ETH</Link>
          </NextLink>
        </Flex>

        {address && (
          <Flex x yc xsb component={Card}>
            <Flex x yc gap3>
              <ContentCopy fontSize="large" />
              <Flex y gap1>
                <Typography level="title-md">Step 2: Transfer ETH to builder.fi</Typography>
                <Typography level="body-sm">{shortAddress(address)}</Typography>
              </Flex>
            </Flex>
            <Link
              onClick={() => {
                navigator.clipboard.writeText(address);
                toast.success("Copied address to clipboard");
              }}
            >
              Copy Address
            </Link>
          </Flex>
        )}
      </Flex>

      <Flex y gap2>
        <Button
          disabled={(balance || 0) < 1000000000000000n}
          onClick={() => router.replace({ searchParams: { skipfund: "1" } }, { preserveSearchParams: true })}
        >
          {(balance || 0) < 1000000000000000n ? "Add at least 0.001 ETH" : "Continue"}
        </Button>

        <Flex x yc xc gap1 fullwidth>
          <Typography level="body-sm" textAlign="center">
            <Skeleton loading={balanceIsLoading}>
              Your builder.fi balance: {formatToDisplayString(balance, 18)} ETH
            </Skeleton>
          </Typography>
          <IconButton onClick={refetchBalance}>
            <Refresh fontSize="small" htmlColor={theme.palette.neutral[500]} />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
}
