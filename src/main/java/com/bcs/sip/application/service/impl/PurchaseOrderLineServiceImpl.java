package com.bcs.sip.application.service.impl;

import com.bcs.sip.application.service.PurchaseOrderLineService;
import com.bcs.sip.application.domain.PurchaseOrderLine;
import com.bcs.sip.application.repository.PurchaseOrderLineRepository;
import com.bcs.sip.application.service.dto.PurchaseOrderLineDTO;
import com.bcs.sip.application.service.mapper.PurchaseOrderLineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing PurchaseOrderLine.
 */
@Service
@Transactional
public class PurchaseOrderLineServiceImpl implements PurchaseOrderLineService {

    private final Logger log = LoggerFactory.getLogger(PurchaseOrderLineServiceImpl.class);

    private final PurchaseOrderLineRepository purchaseOrderLineRepository;

    private final PurchaseOrderLineMapper purchaseOrderLineMapper;

    public PurchaseOrderLineServiceImpl(PurchaseOrderLineRepository purchaseOrderLineRepository, PurchaseOrderLineMapper purchaseOrderLineMapper) {
        this.purchaseOrderLineRepository = purchaseOrderLineRepository;
        this.purchaseOrderLineMapper = purchaseOrderLineMapper;
    }

    /**
     * Save a purchaseOrderLine.
     *
     * @param purchaseOrderLineDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PurchaseOrderLineDTO save(PurchaseOrderLineDTO purchaseOrderLineDTO) {
        log.debug("Request to save PurchaseOrderLine : {}", purchaseOrderLineDTO);
        PurchaseOrderLine purchaseOrderLine = purchaseOrderLineMapper.toEntity(purchaseOrderLineDTO);
        purchaseOrderLine = purchaseOrderLineRepository.save(purchaseOrderLine);
        return purchaseOrderLineMapper.toDto(purchaseOrderLine);
    }

    /**
     * Get all the purchaseOrderLines.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PurchaseOrderLineDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PurchaseOrderLines");
        return purchaseOrderLineRepository.findAll(pageable)
            .map(purchaseOrderLineMapper::toDto);
    }


    /**
     * Get one purchaseOrderLine by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PurchaseOrderLineDTO> findOne(Long id) {
        log.debug("Request to get PurchaseOrderLine : {}", id);
        return purchaseOrderLineRepository.findById(id)
            .map(purchaseOrderLineMapper::toDto);
    }

    /**
     * Delete the purchaseOrderLine by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PurchaseOrderLine : {}", id);
        purchaseOrderLineRepository.deleteById(id);
    }
}
