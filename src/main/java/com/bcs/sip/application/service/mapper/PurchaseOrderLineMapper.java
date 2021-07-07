package com.bcs.sip.application.service.mapper;

import com.bcs.sip.application.domain.*;
import com.bcs.sip.application.service.dto.PurchaseOrderLineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PurchaseOrderLine and its DTO PurchaseOrderLineDTO.
 */
@Mapper(componentModel = "spring", uses = {PurchaseOrderMapper.class, SKUMapper.class})
public interface PurchaseOrderLineMapper extends EntityMapper<PurchaseOrderLineDTO, PurchaseOrderLine> {

    @Mapping(source = "purchaseOrder.id", target = "purchaseOrderId")
    @Mapping(source = "sku.id", target = "skuId")
    PurchaseOrderLineDTO toDto(PurchaseOrderLine purchaseOrderLine);

    @Mapping(source = "purchaseOrderId", target = "purchaseOrder")
    @Mapping(source = "skuId", target = "sku")
    PurchaseOrderLine toEntity(PurchaseOrderLineDTO purchaseOrderLineDTO);

    default PurchaseOrderLine fromId(Long id) {
        if (id == null) {
            return null;
        }
        PurchaseOrderLine purchaseOrderLine = new PurchaseOrderLine();
        purchaseOrderLine.setId(id);
        return purchaseOrderLine;
    }
}
