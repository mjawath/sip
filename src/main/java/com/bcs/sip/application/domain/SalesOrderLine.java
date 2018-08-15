package com.bcs.sip.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SalesOrderLine.
 */
@Entity
@Table(name = "sales_order_line")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SalesOrderLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "qty", nullable = false)
    private Integer qty;

    @ManyToOne
    @JsonIgnoreProperties("lineItems")
    private SalesOrder salesOrder;

    @ManyToOne
    @JsonIgnoreProperties("")
    private SKU sku;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQty() {
        return qty;
    }

    public SalesOrderLine qty(Integer qty) {
        this.qty = qty;
        return this;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public SalesOrder getSalesOrder() {
        return salesOrder;
    }

    public SalesOrderLine salesOrder(SalesOrder salesOrder) {
        this.salesOrder = salesOrder;
        return this;
    }

    public void setSalesOrder(SalesOrder salesOrder) {
        this.salesOrder = salesOrder;
    }

    public SKU getSku() {
        return sku;
    }

    public SalesOrderLine sku(SKU sKU) {
        this.sku = sKU;
        return this;
    }

    public void setSku(SKU sKU) {
        this.sku = sKU;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SalesOrderLine salesOrderLine = (SalesOrderLine) o;
        if (salesOrderLine.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salesOrderLine.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalesOrderLine{" +
            "id=" + getId() +
            ", qty=" + getQty() +
            "}";
    }
}
