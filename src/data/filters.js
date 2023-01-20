export default [
    {
      id: '0',
      name: 'Sectors',
      options: [
        { value: 'l1_l2_bridges', label: 'L1s, L2s, Bridges', checked: true },
        { value: 'dexs_oracles', label: 'DEXs, Oracles', checked: true },
        { value: 'gamefi', label: 'GameFi', checked: true },
        { value: 'nfts', label: 'NFTs', checked: true },
        { value: 'realworld', label: 'Real World', checked: true },
        { value: 'defi', label: 'DeFi', checked: true },
      ],
    },
    {
      id: '1',
      name: 'Quality / Rating',
      options: [
        { value: 'a*', label: 'A*', checked: true },
        { value: 'a', label: 'A', checked: true },
        { value: 'b', label: 'B', checked: true },
        { value: 'c', label: 'C', checked: true },
        { value: 'd', label: 'D', checked: true },
      ],
    },
    {
      id: '2',
      name: 'Round Type',
      options: [
        { value: 'pre-seed', label: 'Pre-Seed', checked: true },
        { value: 'seed', label: 'Seed', checked: true },
        { value: 'series_a', label: 'Series A', checked: true },
        { value: 'series_b', label: 'Series B', checked: true },
        { value: 'series_c', label: 'Series C', checked: true },
      ],
    },
    {
      id: '3',
      name: 'Status',
      options: [
        { value: 'in_progress', label: 'In Progress', checked: true },
        { value: 'complete', label: 'Complete', checked: true },
        { value: 'rejected', label: 'Rejected', checked: false },
      ],
    },
]