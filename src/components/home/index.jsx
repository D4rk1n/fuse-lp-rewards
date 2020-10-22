import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfoBox from '@/components/home/InfoBox'
import Tabs from '@/components/home/Tabs'
import briefcaseIcongray from '@/assets/images/briefcase-check-gray.svg'
import briefcaseIcon from '@/assets/images/briefcase-check.svg'
import walletIcon from '@/assets/images/wallet-plus.svg'
import walletIcongray from '@/assets/images/wallet-plus-gray.svg'
import percentageIcon from '@/assets/images/percentage.svg'
import percentageIcongray from '@/assets/images/percentage-gray.svg'
import { formatWei, formatWeiToNumber } from '@/utils/format'
import useInterval from '@/hooks/useInterval'
import { getStatsData } from '@/actions/staking'

export default ({ handleConnect }) => {
  const dispatch = useDispatch()
  const { accruedRewards = 0, totalStaked = 0 } = useSelector(state => state.staking)
  const { accountAddress } = useSelector(state => state.network)
  const [isRunning, setIsRunning] = useState(!!accountAddress)

  useEffect(() => {
    if (accountAddress) {
      setIsRunning(true)
    }
  }, [accountAddress])

  useInterval(() => {
    dispatch(getStatsData())
  }, isRunning ? 5000 : null)

  return (
    <div className='main__wrapper'>
      <div className='main'>
        <h1 className='title'>Add liquidity</h1>
        <div className='boxs'>
          <InfoBox
            name='apy'
            modalText='APY - Annual Percentage Yield (APY) is the estimated yearly yield for tokens locked. Our calculation is " $ locked * (1 year in second)/(total stake in $ * time remaining in seconds).'
            withSymbol={false}
            title='Deposit APY'
            Icon={() => (
              <img src={accountAddress ? percentageIcon : percentageIcongray} />
            )}
          />
          <InfoBox
            name='deposits'
            modalText='Your Deposits - Your deposits shows the total amount of FUSE you have deposited into the Staking Contract.'
            title='Your deposits'
            end={formatWeiToNumber(totalStaked)}
            value={`${formatWei(totalStaked)} FUSE`}
            Icon={() => (
              <img src={accountAddress ? briefcaseIcon : briefcaseIcongray} />
            )}
          />
          <InfoBox
            name='rewards'
            modalText={"Accrued Rewards - Accrued Rewards refers to the total FUSE you've earned for your stake"}
            end={formatWeiToNumber(accruedRewards)}
            title='Accrued rewards'
            value={`${formatWei(accruedRewards)} FUSE`}
            Icon={() => (
              <img src={accountAddress ? walletIcon : walletIcongray} />
            )}
          />
        </div>
        <Tabs handleConnect={handleConnect} />
      </div>
    </div>
  )
}
