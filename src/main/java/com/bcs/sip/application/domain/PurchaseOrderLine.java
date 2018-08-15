package com.bcs.sip.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PurchaseOrderLine.
 */
@Entity
@Table(name = "purchase_order_line")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PurchaseOrderLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "qty", nullable = false)
    private Integer qty;

    @ManyToOne
    @JsonIgnoreProperties("lineItems")
    private PurchaseOrder purchaseOrder;

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

    public PurchaseOrderLine qty(Integer qty) {
        this.qty = qty;
        return this;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public PurchaseOrder getPurchaseOrder() {
        return purchaseOrder;
    }

    public PurchaseOrderLine purchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
        return this;
    }

    public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }

    public SKU getSku() {
        return sku;
    }

    public PurchaseOrderLine sku(SKU sKU) {
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
        PurchaseOrderLine purchaseOrderLine = (PurchaseOrderLine) o;
        if (purchaseOrderLine.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), purchaseOrderLine.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PurchaseOrderLine{" +
            "id=" + getId() +
            ", qty=" + getQty() +
            "}";
    }
}
