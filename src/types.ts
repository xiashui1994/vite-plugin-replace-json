export interface Config {
  /**
   * 要替换的 JSON 文件的路径
  */
  path: string;
  /**
   * 要替换的字段列表
   */
  replace: Replace;
}

export interface Replace {
  /**
   * 要替换的键值对
   * key: 要替换的键
   * value: 要替换的值
   */
  [key: string]: string;
}
