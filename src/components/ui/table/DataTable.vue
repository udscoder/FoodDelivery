<script setup lang="ts" generic="T extends Record<string, any>">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { DataTableColumn } from "./types";

const props = withDefaults(
  defineProps<{
    columns: DataTableColumn<T>[];
    data?: T[] | null;
    loading?: boolean;
    /** Unique key on each row used for :key. Defaults to "id". */
    rowKey?: keyof T | string;
    caption?: string;
    emptyText?: string;
    loadingText?: string;
  }>(),
  {
    data: () => [],
    loading: false,
    rowKey: "id",
    emptyText: "No records found.",
    loadingText: "Loading…",
  },
);

/** Read a possibly-nested value out of a row ("SUPERADMIN.name"). */
function getValue(row: T, key: string) {
  return key.split(".").reduce<any>((acc, part) => acc?.[part], row);
}

function cellContent(column: DataTableColumn<T>, row: T) {
  const raw = getValue(row, column.key);
  const value = column.format ? column.format(raw, row) : raw;
  return value ?? "-";
}

function rowKeyValue(row: T, index: number) {
  const key = getValue(row, String(props.rowKey));
  return key ?? index;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;
</script>

<template>
  <div class="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
    <Table>
      <TableCaption v-if="caption" class="pb-4">{{ caption }}</TableCaption>

      <TableHeader>
        <TableRow class="bg-muted/60 hover:bg-muted/60">
          <TableHead
            v-for="column in columns"
            :key="column.key"
            :style="column.width ? { width: column.width } : undefined"
            :class="cn('h-12 font-semibold text-foreground', alignClass[column.align ?? 'left'])"
          >
            {{ column.header }}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableEmpty v-if="loading" :colspan="columns.length" class="text-muted-foreground">
          {{ loadingText }}
        </TableEmpty>

        <TableEmpty
          v-else-if="!data || data.length === 0"
          :colspan="columns.length"
          class="text-muted-foreground"
        >
          {{ emptyText }}
        </TableEmpty>

        <TableRow
          v-for="(row, index) in data"
          v-else
          :key="rowKeyValue(row, index)"
          class="transition-colors hover:bg-muted/40"
        >
          <TableCell
            v-for="column in columns"
            :key="column.key"
            :class="cn('py-3', alignClass[column.align ?? 'left'], column.cellClass)"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="getValue(row, column.key)">
              {{ cellContent(column, row) }}
            </slot>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
