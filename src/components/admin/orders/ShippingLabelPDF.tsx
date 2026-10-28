"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    borderBottom: '2 solid #000000',
    paddingBottom: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  orderId: {
    fontSize: 12,
    color: '#666666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#F3F4F6',
    padding: 5,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  bold: {
    fontWeight: 'bold',
  },
  itemsTable: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '75%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#F3F4F6',
  },
  tableColHeaderSmall: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#F3F4F6',
  },
  tableCol: {
    width: '75%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColSmall: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#999999',
    fontSize: 10,
    borderTop: '1 solid #EEEEEE',
    paddingTop: 10,
  },
  barcode: {
    alignSelf: 'center',
    marginTop: 30,
    padding: 20,
    border: '1 dashed #999999',
    textAlign: 'center',
  }
});

interface ShippingLabelPDFProps {
  order: any;
}

export const ShippingLabelPDF = ({ order }: ShippingLabelPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>LAVVYAASHI</Text>
        <Text style={styles.orderId}>Order #{order.id.slice(0, 8).toUpperCase()}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
        <View style={{ width: '45%' }}>
          <Text style={styles.sectionTitle}>Ship To:</Text>
          <Text style={[styles.text, styles.bold]}>{order.address.name}</Text>
          <Text style={styles.text}>{order.address.line1}</Text>
          {order.address.line2 && <Text style={styles.text}>{order.address.line2}</Text>}
          <Text style={styles.text}>{order.address.city}, {order.address.state} {order.address.zip}</Text>
          <Text style={styles.text}>{order.address.country || 'India'}</Text>
          <Text style={styles.text}>Ph: {order.address.phone}</Text>
        </View>

        <View style={{ width: '45%' }}>
          <Text style={styles.sectionTitle}>Order Details:</Text>
          <Text style={styles.text}>Date: {new Date(order.created_at).toLocaleDateString()}</Text>
          <Text style={styles.text}>Payment: {order.payment_method.toUpperCase()}</Text>
          {order.payment_method === 'cod' && (
            <Text style={[styles.text, styles.bold, { color: '#D10000', marginTop: 5 }]}>
              COLLECT CASH: Rs. {order.total}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items:</Text>
        <View style={styles.itemsTable}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Product</Text>
            </View>
            <View style={styles.tableColHeaderSmall}>
              <Text style={styles.tableCellHeader}>Quantity</Text>
            </View>
          </View>
          {order.order_items?.map((item: any, i: number) => (
            <View style={styles.tableRow} key={i}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.product_name}</Text>
              </View>
              <View style={styles.tableColSmall}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.barcode}>
        <Text style={{ fontSize: 10, color: '#666' }}>[ BARCODE PLACEHOLDER ]</Text>
        <Text style={{ fontSize: 14, letterSpacing: 2, marginTop: 5 }}>*{order.id.slice(0, 12).toUpperCase()}*</Text>
      </View>

      <View style={styles.footer}>
        <Text>Thank you for shopping with Lavvyaashi.</Text>
        <Text>Return Address: Lavvyaashi Warehouse, 123 Luxury Lane, New Delhi, 110001, India</Text>
      </View>
    </Page>
  </Document>
);
