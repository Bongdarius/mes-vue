<template>
  <div class="container-fluid">
    <wj-flex-grid
      :itemsSource="data"
      :initialized="initializedGrid"
      :allowAddNew="true"
      :allowDelete="true"
    >
      <wj-flex-grid-cell-template cellType="TopLeft">
        <div @click="topLeftClick" style="cursor: grab">
          <top-left></top-left>
        </div>
      </wj-flex-grid-cell-template>
    </wj-flex-grid>
    <div style="display: none">
      <wj-list-box class="column-picker" :initialized="initializedPicker"></wj-list-box>
    </div>

    <div class="checkbox">
      <label> <input @click="enableDrag" type="checkbox" /> Enable drag-and-drop </label>
    </div>

    <p>
      You can use the grid's
      <b>columnLayout</b> property to allow users to save and restore column layouts. Click the
      buttons below to see how this works:
    </p>
    <button @click="saveLayout" class="btn btn-default">Save Layout</button>
    <button @click="loadLayout" class="btn btn-default">Restore Layout</button>
  </div>
</template>

<script setup lang="ts">
import '@mescius/wijmo.styles/wijmo.css';
import { ref, onMounted } from 'vue';
import {
  showPopup,
  hidePopup,
  // hasClass,
  contains,
  closest,
  createElement,
  removeChild,
  getElement,
  CollectionView,
} from '@mescius/wijmo';
import * as wijmoGrid from '@mescius/wijmo.grid';
import * as wijmoInput from '@mescius/wijmo.input';
import TopLeft from '@/components/TopLeft.vue';

interface Item {
  id: number;
  start: Date;
  end: Date;
  country: string;
  product: string;
  color: string;
  countryId: number;
  productId: number;
  colorId: number;
  amount1: number;
  amount2: number;
  amount3: number;
  amount4: number;
  amount5: number;
  discount: number;
  active: boolean;
}

const getData = () => {
  const data: Item[] = [],
    countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
    products = ['Widget', 'Sprocket', 'Gadget', 'Doohickey'],
    colors = ['Black', 'White', 'Red', 'Green', 'Blue'],
    dt = new Date();
  for (let i = 0; i < 100; i++) {
    const date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
      countryId = Math.floor(Math.random() * countries.length),
      productId = Math.floor(Math.random() * products.length),
      colorId = Math.floor(Math.random() * colors.length);
    const item: Item = {
      id: i,
      start: date,
      end: date,
      country: countries[countryId],
      product: products[productId],
      color: colors[colorId],
      countryId: countryId,
      productId: productId,
      colorId: colorId,
      amount1: Math.random() * 10000 - 5000,
      amount2: Math.random() * 10000 - 5000,
      amount3: Math.random() * 10000 - 5000,
      amount4: Math.random() * 10000 - 5000,
      amount5: Math.random() * 10000 - 5000,
      discount: Math.random() / 4,
      active: i % 4 == 0,
    };
    data.push(item);
  }

  return data;
};

const data = new CollectionView(getData(), {
  trackChanges: true,
});
const isDragEnabled = ref(false);
let flex: wijmoGrid.FlexGrid | null = null;
let columnPicker: wijmoInput.ListBox | null = null;
const dragSrc = ref<Element | null | undefined>(null);
const dragDst = ref<Element | null | undefined>(null);

const saveLayout = () => {
  if (flex) {
    localStorage.setItem('myLayout', flex.columnLayout);
  }
};

const loadLayout = () => {
  const layout = localStorage.getItem('myLayout');
  if (layout && flex) {
    flex.columnLayout = layout;
  }
};

const initializedPicker = (picker: wijmoInput.ListBox) => {
  columnPicker = picker;
};

const initializedGrid = (ctl: wijmoGrid.FlexGrid) => {
  flex = ctl;

  window.addEventListener('touchstart', (e) => {
    const host = columnPicker?.hostElement;
    if (!contains(host, e.target) && !closest(e.target, '.wj-flexgrid')) {
      if (host instanceof HTMLElement) {
        hidePopup(host, true, true);
      }
    }
  });
};

const topLeftClick = (e: Event) => {
  const refElement = flex?.hostElement.querySelector('.wj-topleft');
  // if (hasClass(e.target, 'column-picker-icon')) {
  const host = columnPicker?.hostElement;
  if (!host?.offsetHeight) {
    if (host instanceof HTMLElement) {
      showPopup(host, refElement, true, true, false);
      columnPicker?.focus();
    }
  } else {
    hidePopup(host, true, true);
    flex?.focus();
  }
  e.preventDefault();
  // }
};

const enableDrag = (e: Event) => {
  const inputEl = e.target as HTMLInputElement;
  isDragEnabled.value = inputEl.checked;
  const items = columnPicker?.hostElement.getElementsByClassName('wj-listbox-item');
  if (items) {
    for (const item of items) {
      item.setAttribute('draggable', isDragEnabled.value.toString());
    }
  }
};

const handleDragStart = (e: DragEvent) => {
  dragSrc.value = closest(e.target, '.wj-listbox-item');
  if (dragSrc.value) {
    if (e.dataTransfer) {
      e.dataTransfer.setData('text', dragSrc.value.innerHTML);
      e.dataTransfer.effectAllowed = 'move';
    }
  }
};

const handleDragOver = (e: DragEvent) => {
  const dragOver = closest(e.target, '.wj-listbox-item');
  if (dragDst.value && dragDst.value !== dragOver) {
    removeDropMarker();
  }
  if (dragOver && dragOver !== dragSrc.value) {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
    dragDst.value = dragOver;
    if (dragSrc.value && dragDst.value) {
      const src = getElementIndex(dragSrc.value);
      const dst = getElementIndex(dragDst.value);
      removeDropMarker();
      if (typeof dst === 'number' && typeof src === 'number') {
        addDropMarker(dst > src);
      }
    }
  } else {
    dragDst.value = null;
  }
};

const handleDrop = (e: DragEvent) => {
  if (dragSrc.value && dragDst.value) {
    e.preventDefault();
    if (dragSrc.value && dragDst.value) {
      const src = getElementIndex(dragSrc.value);
      const dst = getElementIndex(dragDst.value);
      if (typeof dst === 'number' && typeof src === 'number') {
        flex?.columns.moveElement(src, dst);
      }
    }
  }
};

const handleDragEnd = () => {
  dragSrc.value = null;
  dragDst.value = null;
  removeDropMarker();
};

const removeDropMarker = () => {
  removeChild(getElement('.drop-marker'));
};

const addDropMarker = (isAfterPos: boolean) => {
  const dragDst_ = dragDst.value as HTMLElement;

  const itemsGap = 10;
  const width = 6;
  const height = dragDst_.clientHeight;
  const topPos = dragDst_.offsetTop;
  const leftPos = isAfterPos
    ? dragDst_.offsetLeft + dragDst_.clientWidth + itemsGap
    : dragDst_.offsetLeft - itemsGap;
  const css = `top:${topPos}px;left:${leftPos}px;height:${height}px;width:${width}px`;
  const html = `<div class="drop-marker" style="${css}">&nbsp;</div>`;
  createElement(html, columnPicker?.hostElement);
};

const getElementIndex = (element: Element) => {
  const parent = element.parentElement;
  if (parent) {
    const siblings = Array.from(parent.children);
    return siblings.indexOf(element);
  }
};

onMounted(() => {
  if (flex && columnPicker) {
    columnPicker.itemsSource = flex.columns;
    columnPicker.checkedMemberPath = 'visible';
    columnPicker.displayMemberPath = 'header';

    if (columnPicker) {
      columnPicker.lostFocus.addHandler(() => {
        if (columnPicker) {
          hidePopup(columnPicker.hostElement);
        }
      });
    }

    columnPicker.formatItem.addHandler((s, e) => {
      e.item.setAttribute('draggable', isDragEnabled.value.toString());
    });
    const host = columnPicker.hostElement;
    host.addEventListener('dragstart', handleDragStart);
    host.addEventListener('dragover', handleDragOver);
    host.addEventListener('drop', handleDrop);
    host.addEventListener('dragend', handleDragEnd);
  }
});
</script>

<style>
.wj-flexgrid {
  max-height: 300px;
  margin: 10px 0;
}

.column-picker-icon {
  cursor: pointer;
  color: #ff8754;
  margin: 3px;
}

.wj-listbox.column-picker {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0 10px;
  columns: 4;
  /* IE fallback */
  padding: 12px;
  margin-left: 12px;
  margin-top: 26px;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
}

body .wj-listbox .wj-listbox-item > label {
  display: block;
  margin: 0 0 3px 0;
}

.wj-listbox .wj-listbox-item.wj-state-selected {
  background: transparent;
  color: inherit;
}

.wj-listbox .wj-listbox-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.wj-listbox .drop-marker {
  position: absolute;
  background: #0085c7;
  opacity: 0.5;
  pointer-events: none;
  z-index: 1000;
}
</style>
