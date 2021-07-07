package com.bcs.sip.application.service.mapper;

import com.bcs.sip.application.domain.*;
import com.bcs.sip.application.service.dto.SKUDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SKU and its DTO SKUDTO.
 */
@Mapper(componentModel = "spring", uses = {ItemMapper.class})
public interface SKUMapper extends EntityMapper<SKUDTO, SKU> {

    @Mapping(source = "item.id", target = "itemId")
    SKUDTO toDto(SKU sKU);

    @Mapping(source = "itemId", target = "item")
    SKU toEntity(SKUDTO sKUDTO);

    default SKU fromId(Long id) {
        if (id == null) {
            return null;
        }
        SKU sKU = new SKU();
        sKU.setId(id);
        return sKU;
    }
}
