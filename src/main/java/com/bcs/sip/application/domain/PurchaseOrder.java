package com.bcs.sip.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A PurchaseOrder.
 */
@Entity
@Table(name = "purchase_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PurchaseOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @OneToMany(mappedBy = "purchaseOrder")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PurchaseOrderLine> lineItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public PurchaseOrder code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<PurchaseOrderLine> getLineItems() {
        return lineItems;
    }

    public PurchaseOrder lineItems(Set<PurchaseOrderLine> purchaseOrderLines) {
        this.lineItems = purchaseOrderLines;
        return this;
    }

    public PurchaseOrder addLineItem(PurchaseOrderLine purchaseOrderLine) {
        this.lineItems.add(purchaseOrderLine);
        purchaseOrderLine.setPurchaseOrder(this);
        return this;
    }

    public PurchaseOrder removeLineItem(PurchaseOrderLine purchaseOrderLine) {
        this.lineItems.remove(purchaseOrderLine);
        purchaseOrderLine.setPurchaseOrder(null);
        return this;
    }

    public void setLineItems(Set<PurchaseOrderLine> purchaseOrderLines) {
        this.lineItems = purchaseOrderLines;
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
        PurchaseOrder purchaseOrder = (PurchaseOrder) o;
        if (purchaseOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), purchaseOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PurchaseOrder{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            "}";
    }
}
