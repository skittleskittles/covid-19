# covid-19

## html 
前端框架文件夹

其中scripts和views文件夹下，timezone是时空态势，yuqing是舆情分析，index是主界面

## ChinaVis2020
django框架。

建议了解django工作流以及wsgi协议。（model，views，urls）

django + mysql + echarts 参考网址：

* https://mewhz.com/index.php/2019/12/03/django_link_mysql/
* https://mewhz.com/archives/196

## 我们的数据库

- 基本信息：
  - user：root 		password：12345
  - host：175.24.66.115
  - 连接的schema名称：COVID-19
- 已含有的表：
  - 时空态势：confirmed，cure，death
- 注意：
  - 命名规范：
    - 使用有意义的英文词汇，词汇中间以下划线分隔。（不要用拼音）
    - 只能使用英文字母，数字，下划线，并以英文字母开头。
    - 库、表、字段全部采用小写，不要使用驼峰式命名。
    - 避免用ORACLE、MySQL的保留字，如desc，关键字如index。
    - 命名禁止超过32个字符，须见名之意，建议使用名词不是动词
    - 数据库，数据表一律使用前缀
      - 临时库、表名必须以tmp为前缀，并以日期为后缀
      - 备份库、表必须以bak为前缀，并以日期为后缀

## pip install

需要为python环境安装以下包（详细安装方法见baidu）

- django
- pymysql
- 待补充