package com.bcs.sip.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.bcs.sip.application.service.PurchaseOrderLineService;
import com.bcs.sip.application.web.rest.errors.BadRequestAlertException;
import com.bcs.sip.application.web.rest.util.HeaderUtil;
import com.bcs.sip.application.web.rest.util.PaginationUtil;
import com.bcs.sip.application.service.dto.PurchaseOrderLineDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PurchaseOrderLine.
 */
@RestController
@RequestMapping("/api")
public class PurchaseOrderLineResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseOrderLineResource.class);

    private static final String ENTITY_NAME = "purchaseOrderLine";

    private final PurchaseOrderLineService purchaseOrderLineService;

    public PurchaseOrderLineResource(PurchaseOrderLineService purchaseOrderLineService) {
        this.purchaseOrderLineService = purchaseOrderLineService;
    }

    /**
     * POST  /purchase-order-lines : Create a new purchaseOrderLine.
     *
     * @param purchaseOrderLineDTO the purchaseOrderLineDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new purchaseOrderLineDTO, or with status 400 (Bad Request) if the purchaseOrderLine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/purchase-order-lines")
    @Timed
    public ResponseEntity<PurchaseOrderLineDTO> createPurchaseOrderLine(@Valid @RequestBody PurchaseOrderLineDTO purchaseOrderLineDTO) throws URISyntaxException {
        log.debug("REST request to save PurchaseOrderLine : {}", purchaseOrderLineDTO);
        if (purchaseOrderLineDTO.getId() != null) {
            throw new BadRequestAlertException("A new purchaseOrderLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PurchaseOrderLineDTO result = purchaseOrderLineService.save(purchaseOrderLineDTO);
        return ResponseEntity.created(new URI("/api/purchase-order-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /purchase-order-lines : Updates an existing purchaseOrderLine.
     *
     * @param purchaseOrderLineDTO the purchaseOrderLineDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated purchaseOrderLineDTO,
     * or with status 400 (Bad Request) if the purchaseOrderLineDTO is not valid,
     * or with status 500 (Internal Server Error) if the purchaseOrderLineDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/purchase-order-lines")
    @Timed
    public ResponseEntity<PurchaseOrderLineDTO> updatePurchaseOrderLine(@Valid @RequestBody PurchaseOrderLineDTO purchaseOrderLineDTO) throws URISyntaxException {
        log.debug("REST request to update PurchaseOrderLine : {}", purchaseOrderLineDTO);
        if (purchaseOrderLineDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PurchaseOrderLineDTO result = purchaseOrderLineService.save(purchaseOrderLineDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, purchaseOrderLineDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /purchase-order-lines : get all the purchaseOrderLines.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of purchaseOrderLines in body
     */
    @GetMapping("/purchase-order-lines")
    @Timed
    public ResponseEntity<List<PurchaseOrderLineDTO>> getAllPurchaseOrderLines(Pageable pageable) {
        log.debug("REST request to get a page of PurchaseOrderLines");
        Page<PurchaseOrderLineDTO> page = purchaseOrderLineService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/purchase-order-lines");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /purchase-order-lines/:id : get the "id" purchaseOrderLine.
     *
     * @param id the id of the purchaseOrderLineDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the purchaseOrderLineDTO, or with status 404 (Not Found)
     */
    @GetMapping("/purchase-order-lines/{id}")
    @Timed
    public ResponseEntity<PurchaseOrderLineDTO> getPurchaseOrderLine(@PathVariable Long id) {
        log.debug("REST request to get PurchaseOrderLine : {}", id);
        Optional<PurchaseOrderLineDTO> purchaseOrderLineDTO = purchaseOrderLineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(purchaseOrderLineDTO);
    }

    /**
     * DELETE  /purchase-order-lines/:id : delete the "id" purchaseOrderLine.
     *
     * @param id the id of the purchaseOrderLineDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/purchase-order-lines/{id}")
    @Timed
    public ResponseEntity<Void> deletePurchaseOrderLine(@PathVariable Long id) {
        log.debug("REST request to delete PurchaseOrderLine : {}", id);
        purchaseOrderLineService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
