export default interface MenuItem<T> {
  content: React.ReactNode
  disabled: boolean
  value: T
  title: string
};
