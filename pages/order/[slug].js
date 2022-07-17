import React from 'react'
import client from '../../apollo/apollo-client'
import ORDER from '../../queries/order'
import LayoutTwo from '../../components/LayoutTwo'
import OrderMain from '../../components/OrderMain'

const Order = ({ order }) => {
  if (typeof window !== 'undefined') {
    fbq('track', 'Purchase', {
      value: parseInt(order.total),
      currency: 'UZS',
    })
  }
  return (
    <LayoutTwo orderPage>
      <OrderMain order={order} />
    </LayoutTwo>
  )
}

export const getServerSideProps = async ({ params }) => {
  const order = await client.query({
    query: ORDER,
    variables: { id: params.slug },
  })

  return {
    props: {
      order: order.data.order,
    },
  }
}

export default Order
