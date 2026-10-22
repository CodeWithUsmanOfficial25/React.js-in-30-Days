
/* Yahan hum Day 2 ka sara data aik jagah rakh rahe hain. */

export const day02Stats = [
  {
    id: 1,
    label: 'Core concepts',
    value: 5,
    detail: 'Aaj ke important topics',
  },
  {
    id: 2,
    label: 'Reusable components',
    value: 2,
    detail: 'UI ko chotay parts mein divide karna',
  },
  {
    id: 3,
    label: 'Learning progress',
    value: 'Day 02',
    detail: 'React journey ka agla step',
  },
]

export const day02Topics = [
  {
    id: 1,
    number: '01',
    title: 'JSX Expressions',
    category: 'JSX',
    description:
      'JavaScript variables aur expressions ko JSX ke andar use karna.',
    example: 'Hello, {name}!',
    status: 'Completed',
  },
  {
    id: 2,
    number: '02',
    title: 'Dynamic Rendering',
    category: 'Rendering',
    description:
      'JavaScript data ki madad se screen par dynamic content dikhana.',
    example: '{topics.map(topic => ...)}',
    status: 'In progress',
  },
  {
    id: 3,
    number: '03',
    title: 'Array Mapping',
    category: 'Arrays',
    description:
      'Arrays ko map() ke zariye multiple UI elements mein convert karna.',
    example: 'items.map(item => ...)',
    status: 'In progress',
  },
  {
    id: 4,
    number: '04',
    title: 'Reusable Components',
    category: 'Components',
    description:
      'UI ke repeat honay walay parts ko reusable components banana.',
    example: '<TopicCard title="JSX" />',
    status: 'In progress',
  },
  {
    id: 5,
    number: '05',
    title: 'Conditional Rendering',
    category: 'Logic',
    description:
      'Conditions ke mutabiq mukhtalif content render karna.',
    example: 'isReady ? "Ready" : "Learning"',
    status: 'In progress',
  },
]
