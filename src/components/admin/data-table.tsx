"use client";

import { Pencil, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";

export type Column<T> = {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type DataTableProps<T extends { id?: string }> = {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onToggleVisibility?: (item: T) => void;
  isVisible?: (item: T) => boolean;
};

export const DataTable = <T extends { id?: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  onToggleVisibility,
  isVisible,
}: DataTableProps<T>) => {
  return (
    <div className="rounded-md border-3 border-[var(--electric-blue)]/20 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--electric-blue)]/10">
            <th className="p-3 text-left text-xs font-bold text-[var(--gray)] w-8">#</th>
            {columns.map((col) => (
              <th key={col.key} className="p-3 text-left text-xs font-bold text-[var(--gray)]">
                {col.label}
              </th>
            ))}
            <th className="p-3 text-right text-xs font-bold text-[var(--gray)] w-28">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 2} className="p-8 text-center text-[var(--gray)] text-sm">
                Henüz veri yok
              </td>
            </tr>
          )}
          {data.map((item, i) => (
            <tr
              key={item.id ?? i}
              className="border-t border-[var(--electric-blue)]/10 hover:bg-[var(--electric-blue)]/5 transition-colors"
            >
              <td className="p-3 text-[var(--gray)]">
                <GripVertical size={14} className="opacity-30" />
              </td>
              {columns.map((col) => (
                <td key={col.key} className="p-3 text-[var(--cream)]">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
              <td className="p-3">
                <div className="flex items-center justify-end gap-1">
                  {onToggleVisibility && isVisible && (
                    <button
                      onClick={() => onToggleVisibility(item)}
                      className="p-1.5 rounded-md hover:bg-[var(--electric-blue)]/20 transition-colors cursor-pointer"
                      title={isVisible(item) ? "Gizle" : "Göster"}
                    >
                      {isVisible(item) ? (
                        <Eye size={14} className="text-[var(--lime)]" />
                      ) : (
                        <EyeOff size={14} className="text-[var(--gray)]" />
                      )}
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1.5 rounded-md hover:bg-[var(--electric-blue)]/20 transition-colors cursor-pointer"
                      title="Düzenle"
                    >
                      <Pencil size={14} className="text-[var(--electric-blue)]" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      className="p-1.5 rounded-md hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
