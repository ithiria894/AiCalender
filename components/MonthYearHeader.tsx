// MonthYearHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MonthYearHeaderProps {
  date: Date;
}

const MonthYearHeader: React.FC<MonthYearHeaderProps> = ({ date }) => {
  const formatMonthYear = (date: Date) => {
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.monthYearContainer}>
      <Text style={styles.monthYearText}>{formatMonthYear(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  monthYearContainer: {
    padding: 10,
    alignItems: 'center',
  },
  monthYearText: {
    fontSize: 20,
  },
});

export default MonthYearHeader;
