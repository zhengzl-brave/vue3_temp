import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export const AutoRegistryComponents = () => {
    return Components({
        resolvers: [AntDesignVueResolver({
            resolveIcons: true,
            importStyle: true
        })],
        dts: 'presets/types/components.d.ts',
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    });
  };