import React from 'react'
import BigNumber from 'bignumber.js'
import { Button, Control, Input, Field, Label } from 'bloomer'

interface IBasicOrderFormProps {
  makerAssetLabel: string,
  takerAssetLabel: string,
  onSubmit: (args: { makerAssetAmount: BigNumber, takerAssetAmount: BigNumber }) => any
}
interface IBasicOrderFormState {
  makerAmount?: number
  takerAmount?: number
}

class BasicOrderForm extends React.Component<
  IBasicOrderFormProps,
  IBasicOrderFormState
> {
  constructor (props: IBasicOrderFormProps) {
    super(props)
    this.state = {
      makerAmount: 0,
      takerAmount: 0
    }
    this.onMakerAmountChange = this.onMakerAmountChange.bind(this)
    this.onTakerAmountChange = this.onTakerAmountChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  public onMakerAmountChange (evt: React.BaseSyntheticEvent) {
    this.setState({ makerAmount: evt.target.value })
  }

  public onTakerAmountChange (evt: React.BaseSyntheticEvent) {
    this.setState({ takerAmount: evt.target.value })
  }

  public onSubmit (evt: React.FormEvent) {
    evt.preventDefault()
    const { makerAmount, takerAmount } = this.state
    const { onSubmit } = this.props
    onSubmit({
      makerAssetAmount: new BigNumber(makerAmount && makerAmount > 0 ? makerAmount.toString() : '0'),
      takerAssetAmount: new BigNumber(takerAmount && takerAmount > 0 ? takerAmount.toString() : '0')
    })
  }

  public render () {
    const { makerAssetLabel, takerAssetLabel } = this.props
    const { makerAmount, takerAmount } = this.state

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Field>
          <Label>{makerAssetLabel}</Label>
          <Control>
            <Input
              type='number'
              placeholder='0'
              min='0'
              max='100000'
              name='makerAssetAmount'
              value={makerAmount}
              onChange={this.onMakerAmountChange}
            />
          </Control>
        </Field>
        <Field>
          <Label>{takerAssetLabel}</Label>
          <Control>
            <Input
              type='number'
              placeholder='0'
              min='0'
              max='1'
              name='takerAssetAmount'
              value={takerAmount}
              onChange={this.onTakerAmountChange}
            />
          </Control>
        </Field>
        <Field>
          <Control>
            <Button isColor='primary' type='submit'>
              Submit
            </Button>
          </Control>
        </Field>
      </form>
    )
  }
}

export { BasicOrderForm }
export default BasicOrderForm
