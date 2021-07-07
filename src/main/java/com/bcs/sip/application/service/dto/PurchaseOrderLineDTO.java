package com.bcs.sip.application.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the PurchaseOrderLine entity.
 */
public class PurchaseOrderLineDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer qty;

    private Long purchaseOrderId;

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

    public Long getPurchaseOrderId() {
        return purchaseOrderId;
    }

    public void setPurchaseOrderId(Long purchaseOrderId) {
        this.purchaseOrderId = purchaseOrderId;
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

        PurchaseOrderLineDTO purchaseOrderLineDTO = (PurchaseOrderLineDTO) o;
        if (purchaseOrderLineDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), purchaseOrderLineDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PurchaseOrderLineDTO{" +
            "id=" + getId() +
            ", qty=" + getQty() +
            ", purchaseOrder=" + getPurchaseOrderId() +
            ", sku=" + getSkuId() +
            "}";
    }
}
