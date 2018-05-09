/**
 * MyIcon icon set component.
 * Usage: <MyIcon name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
const glyphMap = {
  "callx": 58890,
  "zujix": 58892,
  "bianjiiconx": 58941,
  "x": 58942,
  "dingdaniconx": 58943,
  "dingweix": 58944,
  "duigouiconx": 58945,
  "fanhuiiconx": 58946,
  "fankuix": 58947,
  "chaozhibaokuanx": 58948,
  "guanbiiconx": 58949,
  "jindux": 58950,
  "fenlei-iconx": 58951,
  "jinribiqiangx": 58952,
  "jinhuodan-iconx": 58953,
  "liebiaoxianshix": 58954,
  "kefux": 58955,
  "pingjia-chapingx": 58956,
  "pubuliuxianshix": 58957,
  "pingjia-zhongpingx": 58958,
  "quanqiujianhuox": 58959,
  "shanchuiconx": 58960,
  "shaixuaniconx": 58961,
  "shezhix": 58962,
  "shouye-iconx": 58963,
  "sousuoiconx": 58964,
  "weishoucangiconx": 58965,
  "tuikuanx": 58966,
  "wode-shoucangx": 58967,
  "xiaoxiiconx": 58968,
  "xingjix": 58970,
  "wode-iconx": 58971,
  "yuanxingweixuanzhongx": 58972,
  "zhankaiiconx": 58973,
  "regoudanpinx": 58974,
  "yonghumingx": 58969,
  "xingjix1": 58975,
  "mimax": 58976,
  "biaojiiconx": 58977,
  "shoucangiconx": 58978,
  "jindux1": 58979,
  "shoujiyanzhengx": 58980,
  "jiarugouwucheiconx": 58981
};

const iconSet = createIconSet(glyphMap, 'myicon', 'MyIcon.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;

