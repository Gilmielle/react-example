import React from 'react';

interface ILifecycleProps {
  someProp: number;
}

interface ILifecycleState {
  stateField: number;
  isMounted: boolean;
  hasError: boolean;
}

export class Lifecycle extends React.Component<ILifecycleProps, ILifecycleState> {
  constructor(props: ILifecycleProps) {
    super(props);

    // так можно только на этаме инициализации состояния, то есть либо в конструкторе, либо через перегрузку:
    // state: Readonly<SomeInterface> = { name: '123 };
    // не следует копировать пропы в поля состояния при инициализации this.state = { stateField: props.someProp };
    this.state = { stateField: 0, isMounted: false, hasError: false };

    // биндим контекст, то есть передаём this в наш приватный метод handleClick
    // либо можно превратить наш приватный метод handleClick в стрелочную функцию и this станет доступен
    this.handleClick = this.handleClick.bind(this);
  }

  // этот метод вызывается перед методом render, как при маунте компонента, так и при обновлении
  // и каждый раз, когда происходит rereder
  // используется редко, в большинстве случаев лучше пользоваться другими, более подходящими методами
  static getDerivedStateFromProps(props: Readonly<ILifecycleProps>, state: Readonly<ILifecycleState>) {
    // возвращает объект, кот описывает состояние, кот нам необходимо обновить перед рендером приложения
    return { stateField: props.someProp };
  }

  // для обработки ошибок
  // вызывается во время этапа render
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  // не использовать при React.PureComponent
  public shouldComponentUpdate(
    nextProps: Readonly<ILifecycleProps>,
    nextState: Readonly<ILifecycleState>,
    nextContext: any,
  ): boolean {
    // React.Component всегда возвращает true
    // Схема поведения React.PureComponent:
    return this.state != nextState || this.props != nextProps;
    // не стоит использовать JSON.stringify() для сравнения, слишком дорогой метод, лучше взять React.PureComponent
  }

  // может также возвращать массив, строки, числа, null, boolean и порталы (ReactDOM.createPortal())
  public render() {
    if (this.state.hasError) {
      return <div>Error</div>
    }

    return <div onClick={this.handleClick}>1</div>;
  }

  private handleClick() {
    this.setState({ stateField: 1 });
  }

  // вызывается непосредственноп перед обновлением компонента
  // сюда можно передать какие-то значения, который сейчас присутствуют в браузере, например высота скролла, ширина браузера и тд
  // это значение попадёт в метод componentDidUpdate
  public getSnapshotBeforeUpdate(
    prevProps: Readonly<ILifecycleProps>,
    prevState: Readonly<ILifecycleState>
  ): any | null {
    return '';
  }

  public componentDidUpdate(
    prevProps: Readonly<ILifecycleProps>,
    prevState: Readonly<ILifecycleState>,
    snapshot?: any,
  ) {
    // необходим if чтобы не застрять в бесконечной петле
    if (snapshot > 1000) {
      this.setState({});
    }
  }

  // вызывается сразу после того, как компонент был монтирован в DOM-дерево
  public componentDidMount() {
    // возможные методы:
    document.addEventListener('resize', () => {});
    setTimeout(() => {}, 0);
    this.setState({ isMounted: true });
  }

  // нужен для того, чтобы запускать сайд-эффекты при пролучении ошибки
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // сервис логирования, из которого вызываются сайд-эффекты
    // logError(errorInfo.componentStack)
  }

  // вызывается перед тем, как компонент будет удалён из DOM-дерева
  public componentWillUnmount() {
    // возможные методы:
    document.removeEventListener('resize', () => {});
    clearTimeout();
  }
}