import { viteMockServe } from 'vite-plugin-mock'

export const ConfigMockPlugin = (isBuild: boolean) => {
    return viteMockServe({
      mockPath: 'src/mocks',
      localEnabled: !isBuild,
      prodEnabled: false, //实际开发请关闭，会影响打包体积
      // https://github.com/anncwb/vite-plugin-mock/issues/9
    });
  };