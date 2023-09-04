import { PropType, computed, defineComponent, toRefs } from "vue";
import { MenuItem } from "../../types/Menu.ts";
import {
  selectedPath,
  handleItemClick,
  checkKeyIncludesPath,
} from "../../store/menu.ts";
import "../../assets/scss/menu/index.scss";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<MenuItem>,
      default: () => ({}),
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
        <li>
          <div
            class={isSelected.value ? "isSelected" : ""}
            onClick={() => handleItemClick(item, parent)}
          >
            {item.text}
          </div>
          <ul v-show={isSelected.value}>
            {children.map((children) => recursiveRender(children, item))}
          </ul>
        </li>
      ) : (
        <li key="{item.id}">
          <div
            class={isSelected.value ? "isSelected" : ""}
            onClick={() => handleItemClick(item, parent)}
          >
            {item.text}
          </div>
        </li>
      );
    };

    return () => <>{recursiveRender(data.value, parent.value)}</>;
  },
});
