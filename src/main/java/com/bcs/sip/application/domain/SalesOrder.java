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
 * A SalesOrder.
 */
@Entity
@Table(name = "sales_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SalesOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @OneToMany(mappedBy = "salesOrder")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SalesOrderLine> lineItems = new HashSet<>();

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

    public SalesOrder code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<SalesOrderLine> getLineItems() {
        return lineItems;
    }

    public SalesOrder lineItems(Set<SalesOrderLine> salesOrderLines) {
        this.lineItems = salesOrderLines;
        return this;
    }

    public SalesOrder addLineItem(SalesOrderLine salesOrderLine) {
        this.lineItems.add(salesOrderLine);
        salesOrderLine.setSalesOrder(this);
        return this;
    }

    public SalesOrder removeLineItem(SalesOrderLine salesOrderLine) {
        this.lineItems.remove(salesOrderLine);
        salesOrderLine.setSalesOrder(null);
        return this;
    }

    public void setLineItems(Set<SalesOrderLine> salesOrderLines) {
        this.lineItems = salesOrderLines;
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
        SalesOrder salesOrder = (SalesOrder) o;
        if (salesOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salesOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalesOrder{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            "}";
    }
}
