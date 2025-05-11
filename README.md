# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

5.10
"build": "vue-tsc --noEmit --skipLibCheck && vite build",
// "build" 脚本用于构建项目。首先执行 "vue-tsc --noEmit --skipLibCheck" 命令，
// 该命令会使用 TypeScript 编译器对 Vue 项目进行类型检查，"--noEmit" 表示不生成编译后的文件，
// "--skipLibCheck" 表示跳过对库文件的类型检查，以提高检查速度。
// 若类型检查通过，才会执行 "vite build" 命令来构建项目。

5.9
TODO: 有部分网格存在飞地情况，geometry.coordinates中不止一个数组的情况，需要处理

5.8 
根据用户给的shp格式的地图文件，用QGIS批量转化为JSON文件，再用Trae借助AI写的一个页面转换为我们系统可以识别的高德画围栏的格式，转化过程需要处理坐标格式GPS转火星坐标系（高德地图），新建一个JSON文件，填入转好的数据，最后用EXCEL的数据导入功能，生成一个表格给后端，最终实现围栏边界的批量导入系统



QGIS 3.40.3版本竟然没有中文
下载链接：https://download.qgis.org/downloads/
换QGIS3.10.13后可以了
下载链接：https://download.osgeo.org/qgis/windows/QGIS-OSGeo4W-3.10.13-1-Setup-x86_64.exe?US

PS:
  ※※※  [QGIS 矢量图层批量导出geojson格式的脚本](https://blog.csdn.net/pwl124/article/details/142487586?spm=1001.2014.3001.5506)
  from qgis.core import QgsProject, QgsVectorFileWriter, QgsCoordinateReferenceSystem

def export_layers_to_geojson(output_folder):
    # 获取当前QGIS项目中的所有图层
    layers = QgsProject.instance().mapLayers().values()
    
    # 遍历所有图层
    for layer in layers:
        # 检查是否为矢量图层
        if layer.type() == QgsMapLayer.VectorLayer:
            # 构造输出文件路径
            output_file = f"{output_folder}/{layer.name()}.geojson"
            
            # 设置导出选项
            options = QgsVectorFileWriter.SaveVectorOptions()
            options.driverName = "GeoJSON"
            options.fileEncoding = "UTF-8"
            
            # 导出图层为GeoJSON
            QgsVectorFileWriter.writeAsVectorFormat(
                layer,
                output_file,
                options
            )
            
            print(f"Exported: {layer.name()} to {output_file}")

# 设置导出文件夹路径
output_folder = "D:/XX/XXX/XXX"
export_layers_to_geojson(output_folder)

参考资料：[QGIS相关操作指南](https://zhuanlan.zhihu.com/p/590179830)
