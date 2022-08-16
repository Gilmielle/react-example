export function assoc<K extends string, T>(key: K, value: T) {
  return <O extends object>(obj: O) => ({
    ...obj,
    [key]: value,
    // расширяет ли К ключи в О? (те если такой ключ уже был)
    //                      Создаёт тип со свойствами О за исключением ключа К
    //                                 И склеивает с 
    //                                    Тип объекта, ключи свойств которого равны K и значения свойств которого равны T
    //                                                 В противном случае возвращаем склейку между О и Record<K, T>
  }) as K extends keyof O ? (Omit<O, K> & Record<K, T>) : (O & Record<K, T>)
}