package com.bcs.sip.application.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the SalesOrderLine entity.
 */
public class SalesOrderLineDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer qty;

    private Long salesOrderId;

    private Long skuId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQty() {
        return qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public Long getSalesOrderId() {
        return salesOrderId;
    }

    public void setSalesOrderId(Long salesOrderId) {
        this.salesOrderId = salesOrderId;
    }

    public Long getSkuId() {
        return skuId;
    }

    public void setSkuId(Long sKUId) {
        this.skuId = sKUId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SalesOrderLineDTO salesOrderLineDTO = (SalesOrderLineDTO) o;
        if (salesOrderLineDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salesOrderLineDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalesOrderLineDTO{" +
            "id=" + getId() +
            ", qty=" + getQty() +
            ", salesOrder=" + getSalesOrderId() +
            ", sku=" + getSkuId() +
            "}";
    }
}
