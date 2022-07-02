import Menu from '~/api/Menu'
import MenuItem from '~/api/MenuItem'
import Food from '~/api/Food'

export default ($axios) => ({
  menu: Menu($axios),
  menuItem: MenuItem($axios),
  food: Food($axios),
})
