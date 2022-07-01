<template>
  <v-navigation-drawer :value="show" app dark right width="400" fill-height>
    <v-layout column class="fill-height">
      <v-flex class="flex shrink">
        <v-list subheader two-line class="mt-0 mb-0 pb-0">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6"
                >Current Order</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-btn fab small color="red">
                <v-icon color="white">mdi-cancel</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex class="flex overflow-auto grey darken-4">
        <v-list subheader two-line class="mt-1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2"
                >Chicken Sandwhich Combo with Fries</v-list-item-title
              >
              <v-list-item-subtitle> Sauce: Red Sauce </v-list-item-subtitle>
              <v-list-item-subtitle>
                Toppings: Lettuce, Tomato
              </v-list-item-subtitle>
              <v-list-item-subtitle> Request: No bun </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption">$3.95</v-list-item-action>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-note-edit</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2"
                >Chicken Sandwhich Combo with Fries</v-list-item-title
              >
              <v-list-item-subtitle> Sauce: Red Sauce </v-list-item-subtitle>
              <v-list-item-subtitle>
                Toppings: Lettuce, Tomato
              </v-list-item-subtitle>
              <v-list-item-subtitle> Request: No bun </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption">$3.95</v-list-item-action>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-note-edit</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2"
                >Chicken Sandwhich Combo with Fries</v-list-item-title
              >
              <v-list-item-subtitle> Sauce: Red Sauce </v-list-item-subtitle>
              <v-list-item-subtitle>
                Toppings: Lettuce, Tomato
              </v-list-item-subtitle>
              <v-list-item-subtitle> Request: No bun </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption">$3.95</v-list-item-action>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-note-edit</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2"
                >Chicken Sandwhich Combo with Fries</v-list-item-title
              >
              <v-list-item-subtitle> Sauce: Red Sauce </v-list-item-subtitle>
              <v-list-item-subtitle>
                Toppings: Lettuce, Tomato
              </v-list-item-subtitle>
              <v-list-item-subtitle> Request: No bun </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption">$3.95</v-list-item-action>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-note-edit</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2"
                >Chicken Sandwhich Combo with Fries</v-list-item-title
              >
              <v-list-item-subtitle> Sauce: Red Sauce </v-list-item-subtitle>
              <v-list-item-subtitle>
                Toppings: Lettuce, Tomato
              </v-list-item-subtitle>
              <v-list-item-subtitle> Request: No bun </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption">$3.95</v-list-item-action>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-note-edit</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2"
                >Chicken Sandwhich Combo with Fries</v-list-item-title
              >
              <v-list-item-subtitle> Sauce: Red Sauce </v-list-item-subtitle>
              <v-list-item-subtitle>
                Toppings: Lettuce, Tomato
              </v-list-item-subtitle>
              <v-list-item-subtitle> Request: No bun </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption">$3.95</v-list-item-action>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-note-edit</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2"
                >Chicken Sandwhich Combo with Fries</v-list-item-title
              >
              <v-list-item-subtitle> Sauce: Red Sauce </v-list-item-subtitle>
              <v-list-item-subtitle>
                Toppings: Lettuce, Tomato
              </v-list-item-subtitle>
              <v-list-item-subtitle> Request: No bun </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption">$3.95</v-list-item-action>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-note-edit</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>

      <v-flex class="flex shrink pb-2">
        <v-toolbar color="rgba(0,0,0,0)" flat>
          <strong>Subtotal</strong><v-spacer></v-spacer><strong>$18.31</strong>
        </v-toolbar>
        <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n6">
          <span>Tax</span><v-spacer></v-spacer><span>$1.83</span>
        </v-toolbar>
        <v-divider class="mx-4"></v-divider>
        <v-toolbar color="rgba(0,0,0,0)" flat>
          <strong>Total</strong><v-spacer></v-spacer><strong>$20.14</strong>
        </v-toolbar>
        <v-item-group mandatory class="mt-n1">
          <v-container>
            <v-row justify="center">
              <v-col>
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'primary' : ''"
                    class="d-flex align-center rounded-lg"
                    height="70"
                    flat
                    @click="toggle"
                  >
                    <v-row>
                      <v-col>
                        <v-list-item three-line class="text-center mt-1">
                          <v-list-item-content>
                            <div>
                              <v-icon :color="active ? 'white' : 'primary'"
                                >mdi-cash-100</v-icon
                              >
                            </div>
                            <v-list-item-subtitle
                              :class="active ? 'white--text' : 'primary--text'"
                              class="mt-n2 caption"
                              >Cash</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-item>
              </v-col>
              <v-col>
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'primary' : ''"
                    class="d-flex align-center rounded-lg"
                    height="70"
                    flat
                    @click="toggle"
                  >
                    <v-row>
                      <v-col>
                        <v-list-item three-line class="text-center mt-1">
                          <v-list-item-content>
                            <div>
                              <v-icon :color="active ? 'white' : 'primary'"
                                >mdi-credit-card</v-icon
                              >
                            </div>
                            <v-list-item-subtitle
                              :class="active ? 'white--text' : 'primary--text'"
                              class="mt-n2 caption"
                              >Card</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
        <div class="mx-3 mt-2">
          <v-btn block large color="success" height="70">Submit Order</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
}
</script>
