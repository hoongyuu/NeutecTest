import { PropType, computed, defineComponent, toRefs } from "vue";
import { MenuItem } from "../../types/Menu.ts";
import {
  handleItemClick,
  checkKeyIncludesPath,
  selectedPath,
} from "../../store/menu.ts";
import "../../assets/scss/menu/index.scss";

// @ts-ignore
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      default: () => [],
    },
    parent: {
      type: Object as PropType<MenuItem>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { data, parent } = toRefs(props);

    const recursiveRender = (item: MenuItem, parent?: MenuItem) => {
      const children = item.children || [];
      const isSelected = computed(() => checkKeyIncludesPath(item.key));

      return children.length > 0 ? (
        <li key={item.key} class={isSelected.value ? "isSelected" : ""}>
          <div onClick={() => handleItemClick(item, parent)}>{item.text}</div>
          <ul v-show={isSelected.value}>
            {children.map((children) => recursiveRender(children, item))}
          </ul>
        </li>
      ) : (
        <li key={item.key} class={isSelected.value ? "isSelected" : ""}>
          <div onClick={() => handleItemClick(item, parent)}>{item.text}</div>
        </li>
      );
    };

    return () => (
      <DynamicScroller
        items={data.value}
        keyField="key"
        min-item-size={54}
        class="scroller"
        listTag="nav"
      >
        {{
          default: (slots: any) => (
            <DynamicScrollerItem
              item={slots.item}
              tag="ul"
              size-dependencies={selectedPath.value}
              active={slots.active}
            >
              {recursiveRender(slots.item, parent.value)}
            </DynamicScrollerItem>
          ),
        }}
      </DynamicScroller>
    );
  },
});
