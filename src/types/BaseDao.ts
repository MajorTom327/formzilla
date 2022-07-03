export interface BaseDao<T> {
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
}

export default BaseDao;
