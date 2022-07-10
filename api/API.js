import Menu from '~/api/Menu'
import MenuItem from '~/api/MenuItem'
import Food from '~/api/Food'
import Order from '~/api/Order'
import OrderItem from '~/api/OrderItem'

export default ($axios) => ({
  menu: Menu($axios),
  menuItem: MenuItem($axios),
  food: Food($axios),
  order: Order($axios),
  orderItem: OrderItem($axios),
})
