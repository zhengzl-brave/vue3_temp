import AutoImport from 'unplugin-auto-import/vite';
export const AutoImportDeps = () => {
    return AutoImport({
      dts: 'presets/types/auto-imports.d.ts',
      imports: [
        'vue',
        'pinia',
        'vue-router',
        {
          '@vueuse/core': [],
        },
      ],
    });
  };
  