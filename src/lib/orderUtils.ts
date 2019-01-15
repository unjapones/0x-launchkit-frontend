import { BigNumber } from '@0x/utils'
import { Provider, MetamaskSubprovider } from '@0x/subproviders'
import {
  Order,
  SignedOrder,
  generatePseudoRandomSalt,
  orderHashUtils,
  signatureUtils,
  assetDataUtils
} from '@0x/order-utils'
import { Web3Wrapper } from '@0x/web3-wrapper'
import { log } from '../etc'
import {
  NULL_ADDRESS,
  EXCHANGE_ADDRESS,
  DEFAULT_EXPIRATION_TIME_SECS
} from '../common/constants'
import { ITokenData } from '../common/tokens'

const ZERO_AMOUNT = new BigNumber(0)
const EXPIRATION_TIME = new BigNumber(DEFAULT_EXPIRATION_TIME_SECS)

const logger = log.getLogger('orderUtils')

export interface IBasicOrderArgs {
  makerAddress: string
  makerAssetAmount: BigNumber
  makerAssetTokenData: ITokenData
  takerAssetAmount: BigNumber
  takerAssetTokenData: ITokenData
  provider: Provider
}

export async function createBasicSignedOrder (
  args: IBasicOrderArgs
): Promise<SignedOrder> {
  const {
    makerAddress,
    makerAssetAmount,
    makerAssetTokenData,
    takerAssetAmount,
    takerAssetTokenData,
    provider
  } = args
  const order: Order = {
    makerAssetAmount: Web3Wrapper.toBaseUnitAmount(
      makerAssetAmount,
      makerAssetTokenData.decimals
    ),
    takerAssetAmount: Web3Wrapper.toBaseUnitAmount(
      takerAssetAmount,
      takerAssetTokenData.decimals
    ),
    makerAddress: makerAddress.toLowerCase(),
    makerAssetData: assetDataUtils.encodeERC20AssetData(
      makerAssetTokenData.address
    ),
    takerAssetData: assetDataUtils.encodeERC20AssetData(
      takerAssetTokenData.address
    ),
    salt: generatePseudoRandomSalt(),
    exchangeAddress: EXCHANGE_ADDRESS,
    expirationTimeSeconds: new BigNumber(Math.floor(Date.now() / 1000)).add(EXPIRATION_TIME),
    takerAddress: NULL_ADDRESS,
    senderAddress: NULL_ADDRESS,
    feeRecipientAddress: NULL_ADDRESS,
    makerFee: ZERO_AMOUNT,
    takerFee: ZERO_AMOUNT
  }
  const orderHashHex = orderHashUtils.getOrderHashHex(order)
  logger.info('orderHashHex', orderHashHex)
  const signature = await signatureUtils.ecSignHashAsync(
    new MetamaskSubprovider(provider),
    orderHashHex,
    makerAddress
  )
  return { ...order, signature }
}
