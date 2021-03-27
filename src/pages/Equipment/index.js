/* eslint-disable */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Card from '@/components/Card';
import Labels from '@/components/Labels';
import Pie from '@/components/Charts/Pie';
import { genEquipment } from '@/utils/genChartData';
import styles from './index.scss';

const legends = {
  上涨: {
    key: '上涨',
    label: '上涨',
    type: 'circle',
    backgroundColor: '#f44336',
  },
  下跌: {
    key: '下跌',
    label: '下跌',
    type: 'circle',
    backgroundColor: '#00e473',
  },
  /*  涨停: {
    key: '涨停',
    label: '涨停',
    type: 'circle',
    backgroundColor: 'red',
  },
  跌停: {
    key: '跌停',
    label: '跌停',
    type: 'circle',
    backgroundColor: 'green',
  }, */
};

@connect(({ loan }) => ({
  loan,
}))
export default class index extends PureComponent {
  render() {
    const { loan } = this.props;
    const { equipment, channel } = loan;

    const equipmentData = genEquipment(equipment, legends);
    const channelData = calculate(channel);
    return (
      <Card title="涨跌统计" legends={<Labels data={Object.values(legends)} />}>
        <Pie data={equipmentData} style={{ height: 240 }} />
        <div className={styles.channel}>
          <div className={styles.title}>涨停跌停</div>
          {channelData.map(({ name, percent, value }) => (
            <div className={styles.column} key={name}>
              <div className={styles.label}>{name}</div>
              <div className={styles.bars}>
                <div className={styles.inner} />
                <div className={styles.outer} style={{ width: percent }} />
              </div>
              <div className={styles.num}>{value} 家</div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
}

function calculate(data = [], max) {
  let mmax = max;
  if (!mmax) {
    mmax = data.reduce((prev, cur) => cur.value + prev, 0);
  }
  return data.map(e => ({ ...e, percent: `${parseInt((e.value * 100) / mmax, 10)}%` }));
}
